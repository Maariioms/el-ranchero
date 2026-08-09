'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const WELCOME_SUGGESTIONS = [
  '¿Qué presentaciones manejan?',
  '¿Hacen envíos a mi zona?',
  '¿Cómo me hago distribuidor?',
];

const STORAGE_KEY = 'elranchero-chat-history';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          // El usuario canceló — no es un error real, dejamos lo que ya llegó.
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
        className="btn-press fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg shadow-black/40 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat de ayuda de El Ranchero"
          className="modal-in fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[560px] bg-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header — transparencia: deja claro que es un bot */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-surface-raised shrink-0">
            <img
              src="/logo-solo-letras-negras.png"
              alt=""
              className="w-8 h-8 object-contain shrink-0"
              style={{ filter: 'invert(1)' }}
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Asistente El Ranchero</p>
              <p className="text-[11px] text-gray-500 truncate">Respuestas automáticas, no es una persona</p>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-300 max-w-[85%]">
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

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-accent text-white rounded-br-sm'
                      : 'bg-white/5 text-gray-200 rounded-tl-sm'
                  }`}
                >
                  {m.content.length > 0 ? (
                    m.content
                  ) : isStreaming && i === messages.length - 1 ? (
                    <TypingDots />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}

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
          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={isStreaming}
              className="flex-1 min-w-0 bg-bg border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
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
