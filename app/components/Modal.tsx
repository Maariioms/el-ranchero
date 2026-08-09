import React, { useEffect, useRef } from 'react';

// Definimos las "props" que nuestro modal aceptará
interface ModalProps {
  isOpen: boolean;        // Para saber si debe mostrarse
  onClose: () => void;    // La función que debe ejecutar para cerrarse
  children: React.ReactNode; // <-- La magia: ¡el contenido de adentro!
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, children, maxWidth = "max-w-2xl" }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Cierre con Escape + foco atrapado dentro del modal mientras está abierto
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Devuelve el foco a quien abrió el modal
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  // Si no está abierto, no renderiza nada (null)
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-100 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`modal-in relative bg-bg border border-accent/20 p-6 rounded-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black outline-none ${maxWidth}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
            {children}
        </div>
      </div>
    </div>
    );
}