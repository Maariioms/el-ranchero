import React from 'react';

// Definimos las "props" que nuestro modal aceptará
interface ModalProps {
  isOpen: boolean;        // Para saber si debe mostrarse
  onClose: () => void;    // La función que debe ejecutar para cerrarse
  children: React.ReactNode; // <-- La magia: ¡el contenido de adentro!
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, children, maxWidth = "max-w-2xl" }: ModalProps) {
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
        className={`relative bg-[#0A0A0A] border border-[#FD6A02]/20 p-6 rounded-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black ${maxWidth}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD6A02]/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
            {children}
        </div>
      </div>
    </div>
    );
}