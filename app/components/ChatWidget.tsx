'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

type ParsedAction =
  | { type: 'nav'; target: 'productos' | 'interest' }
  | { type: 'form'; data: Record<string, string> }
  | null;

const WELCOME_SUGGESTIONS = [
  '¿Qué presentaciones manejan?',
  '¿Hacen envíos a mi zona?',
  '¿Cómo me hago distribuidor?',
];

const STORAGE_KEY = 'elranchero-chat-history';
const BOUNCE_INTERVAL_MS = 18000;
const BOUNCE_DURATION_MS = 1000;

// Los campos que puede mandar el marcador [[FORM:{...}]] del modelo, mapeados
// 1:1 a los query params que /interest ya sabe leer para precargar el form.
const FORM_FIELD_KEYS = ['nombre', 'negocio', 'telefono', 'email', 'direccion', 'producto', 'cantidad', 'frecuencia', 'mensaje'] as const;

// Detecta los marcadores [[NAV:...]] / [[FORM:{...}]] que el modelo pone al
// final de su respuesta, los separa del texto visible, y — mientras el
// streaming sigue en curso — oculta cualquier marcador a medio escribir para
// que el usuario nunca vea la sintaxis cruda parpadear en pantalla.
function parseMessageContent(content: string): { text: string; action: ParsedAction } {
  const navMatch = content.match(/\[\[NAV:(productos|interest)\]\]/);
  if (navMatch) {
    return {
      text: content.slice(0, navMatch.index).trimEnd(),
      action: { type: 'nav', target: navMatch[1] as 'productos' | 'interest' },
    };
  }

  const formMatch = content.match(/\[\[FORM:(\{[\s\S]*?\})\]\]/);
  if (formMatch) {
    try {
      const parsed = JSON.parse(formMatch[1]) as Record<string, unknown>;
      const data: Record<string, string> = {};
      for (const key of FORM_FIELD_KEYS) {
        const value = parsed[key];
        if (typeof value === 'string' && value.trim()) data[key] = value.trim();
      }
      return { text: content.slice(0, formMatch.index).trimEnd(), action: { type: 'form', data } };
    } catch {
      // JSON incompleto o mal formado — cae al caso de abajo (se oculta el fragmento).
    }
  }

  // Si hay un "[[" abierto sin su "]]" de cierre todavía, escondemos desde ahí
  // para no mostrar un marcador a medio streamear.
  const openIdx = content.lastIndexOf('[[');
  if (openIdx !== -1 && !content.slice(openIdx).includes(']]')) {
    return { text: content.slice(0, openIdx).trimEnd(), action: null };
  }

  return { text: content, action: null };
}

function buildInterestUrl(data: Record<string, string>): string {
  const params = new URLSearchParams(data);
  const qs = params.toString();
  return qs ? `/interest?${qs}` : '/interest';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldBounce, setShouldBounce] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Cargar historial de esta pestaña (no persiste entre sesiones distintas)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // sessionStorage no disponible (modo privado, etc.) — seguimos sin historial
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // no bloqueante si falla
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Foco al abrir + cerrar con Escape (mismo criterio que Modal.tsx)
  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Llamar la atención de vez en cuando sin ser invasivo: solo un rebote
  // físico del botón, nunca un globo de texto ni apertura automática.
  // prefers-reduced-motion ya lo neutraliza globalmente (ver globals.css).
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setShouldBounce(true);
      setTimeout(() => setShouldBounce(false), BOUNCE_DURATION_MS);
    }, BOUNCE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      const history: Message[] = [...messages, { role: 'user', content: trimmed }];
      setMessages([...history, { role: 'assistant', content: '' }]);
      setInput('');
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? 'No pudimos responder en este momento.');
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            copy[copy.length - 1] = { ...last, content: last.content + chunk };
            return copy;
          });
        }

        // Si el modelo no devolvió ningún token (respuesta vacía, filtrada,
        // etc.), nunca dejamos un mensaje vacío en el historial: eso
        // rompería la validación del siguiente request (el backend rechaza
        // cualquier mensaje con content.length === 0). Ponemos un texto de
        // respaldo visible en vez de fallar silenciosamente más adelante.
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === 'assistant' && last.content.trim().length === 0) {
            copy[copy.length - 1] = {
              ...last,
              content: 'No logré generar una respuesta. ¿Puedes reformular tu pregunta?',
            };
          }
          return copy;
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          // El usuario canceló. Si ya llegó texto, lo dejamos; si no llegó
          // nada, quitamos el placeholder vacío por la misma razón de arriba.
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last?.role === 'assistant' && last.content.trim().length === 0) {
              return copy.slice(0, -1);
            }
            return copy;
          });
        } else {
          setError((err as Error).message || 'No pudimos responder en este momento.');
          setMessages((prev) => prev.slice(0, -1)); // quita el placeholder vacío del bot
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  const handleStop = () => abortRef.current?.abort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Burbuja de lanzamiento — discreta, nunca se abre sola */}
      <button
        ref={launcherRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Cerrar chat de ayuda' : 'Abrir chat de ayuda'}
        aria-expanded={isOpen}
        className={`btn-press fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg shadow-black/40 transition-colors ${
          shouldBounce ? 'animate-bounce' : ''
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat de ayuda de El Ranchero"
          className="modal-in fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[560px] bg-surface border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/15 bg-surface-raised shrink-0">
            <img
              src="/logo-solo-letras-negras.png"
              alt=""
              className="w-8 h-8 object-contain shrink-0"
              style={{ filter: 'invert(1)' }}
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Asistente El Ranchero</p>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="bg-white/8 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-300 max-w-[85%]">
                  ¡Hola! Puedo ayudarte con dudas sobre catálogo, envíos o cómo ser distribuidor.
                </div>
                <div className="flex flex-col gap-2">
                  {WELCOME_SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs text-accent hover:text-accent-hover border border-accent/30 hover:border-accent rounded-full px-3 py-2 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              const { text, action } = parseMessageContent(m.content);
              const showTyping = m.role === 'assistant' && isStreaming && isLast && text.length === 0;

              return (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-white/8 text-gray-200 rounded-tl-sm'
                    }`}
                  >
                    {showTyping ? <TypingDots /> : text}
                  </div>

                  {/* Acción sugerida por el bot (aparece cuando el marcador ya cerró) */}
                  {action?.type === 'nav' && (!isStreaming || !isLast) && (
                    <Link
                      href={`/${action.target}`}
                      className="btn-press inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover border border-accent/30 hover:border-accent rounded-full px-3 py-2 transition-colors"
                    >
                      {action.target === 'productos' ? 'Ir a Productos →' : 'Ir al formulario →'}
                    </Link>
                  )}
                  {action?.type === 'form' && (!isStreaming || !isLast) && (
                    <Link
                      href={buildInterestUrl(action.data)}
                      className="btn-press inline-flex items-center gap-1.5 text-xs font-bold text-white bg-accent hover:bg-accent-hover rounded-full px-3 py-2 transition-colors"
                    >
                      Continuar en el formulario →
                    </Link>
                  )}
                </div>
              );
            })}

            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-xl px-4 py-3 text-xs text-gray-300">
                <p className="mb-2">{error}</p>
                <Link href="/interest" className="text-accent font-bold hover:text-accent-hover">
                  Contactar por el formulario →
                </Link>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/15 p-3 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={isStreaming}
              className="flex-1 min-w-0 bg-bg border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={handleStop}
                aria-label="Detener respuesta"
                className="btn-press w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <span className="w-3 h-3 bg-white rounded-xs" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Enviar mensaje"
                className="btn-press w-10 h-10 rounded-full bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:hover:bg-accent text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center py-1" aria-label="Escribiendo">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
    </span>
  );
}
