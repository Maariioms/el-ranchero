import OpenAI from 'openai';
import { SYSTEM_PROMPT } from './knowledge';

export const runtime = 'nodejs';

const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Rate limiting en memoria (best-effort, ver plan §3.3) ---
// No sobrevive cold starts ni se comparte entre instancias, pero para el
// volumen de El Ranchero es suficiente como primera barrera. Si el tráfico
// crece, el siguiente paso es Upstash Redis (rate limit distribuido).
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutos

type RateEntry = { count: number; resetAt: number };
const rateMap = new Map<string, RateEntry>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// --- Validación de input ---
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 20;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function validateMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object' || !('messages' in body)) return null;

  const messages = (body as { messages: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > MAX_HISTORY_LENGTH) return null;

  const clean: ChatMessage[] = [];
  for (const m of messages) {
    if (
      !m ||
      typeof m !== 'object' ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length === 0 ||
      m.content.length > MAX_MESSAGE_LENGTH
    ) {
      return null;
    }
    // Solo pasamos role y content — ignoramos cualquier otro campo del cliente.
    clean.push({ role: m.role, content: m.content });
  }

  return clean;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: 'Demasiados mensajes seguidos. Espera un momento e intenta de nuevo.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const messages = validateMessages(body);
  if (!messages) {
    return new Response(JSON.stringify({ error: 'Mensaje inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      temperature: 0.3,
      max_tokens: 500,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const token = chunk.choices[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(token));
          }
        } catch (err) {
          console.error('Error durante el streaming de OpenAI:', err);
          controller.enqueue(
            encoder.encode('\n\n[Se interrumpió la respuesta. Intenta de nuevo o escríbenos por WhatsApp.]')
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    // No filtramos el error crudo de OpenAI (puede traer detalles internos).
    console.error('Error llamando a OpenAI:', err);
    return new Response(
      JSON.stringify({
        error: 'No pudimos responder en este momento. Intenta de nuevo o escríbenos por WhatsApp.',
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
