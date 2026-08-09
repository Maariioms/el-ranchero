'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, MapPin, ShieldAlert, Flame } from 'lucide-react';
import Modal from './Modal';

export default function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);

  return (
    <>
      <footer className="relative bg-[#050505] border-t border-accent/20 pt-16 pb-8 text-sm overflow-hidden">
        {/* Textura ambiental para que no se sienta como un corte plano tras el CTA */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,106,2,0.06),transparent_55%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">

          {/* --- SECCIÓN DE SEGURIDAD --- */}
          <div className="relative bg-warning/5 backdrop-blur-sm border border-warning/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-warning/5 mb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.1),transparent_40%)] rounded-2xl"></div>

            <div className="relative flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center ring-1 ring-warning/30">
                <ShieldAlert className="w-6 h-6 text-warning" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-warning mb-2 uppercase tracking-wide">
                  Precaución: Monóxido de Carbono
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed max-w-3xl">
                  Quemar carbón en espacios cerrados puede ser fatal. La combustión emite monóxido de carbono, el cual no tiene olor.
                  <span className="text-white font-bold"> NUNCA queme carbón dentro de casas, vehículos o tiendas de campaña.</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Flame className="w-4 h-4 text-accent" />
                    <span>El carbón chispea mientras está encendido</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Flame className="w-4 h-4 text-accent" />
                    <span>Manténgase alejado de niños y mascotas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- LINKS Y NAVEGACIÓN --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-white/10 pb-12">

            {/* Columna 1: La Marca */}
            <div className="col-span-1 md:col-span-1">
              <img
                src="/logo-solo-letras-negras.png"
                alt="El Ranchero"
                className="w-16 h-16 object-contain mb-4"
                style={{ filter: 'invert(1)' }}
              />
              <p className="text-gray-500 mb-6">
                Tradición encendida desde 1923. Llevando el auténtico sabor a las parrillas de todo México.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Columna 2: Productos */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">
                Nuestros Productos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/productos?tipo=carbon" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                    Carbón
                  </Link>
                </li>
                <li>
                  <Link href="/productos?tipo=briqueta" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                    Briquetas
                  </Link>
                </li>
                <li>
                  <Link href="/productos?tipo=iniciador" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                    Iniciadores
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                    Ver Catálogo Completo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Empresa */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Empresa</h4>
              <ul className="space-y-3">
                <li><Link href="/tradicion" className="text-gray-400 hover:text-accent transition-colors">Nuestra Historia</Link></li>
                <li><Link href="/interest" className="text-gray-400 hover:text-accent transition-colors">Sé Distribuidor</Link></li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Ubicación</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <span>
                    Calle No. 11<br />
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="block text-white font-bold">Teléfonos:</span>
                  (55) xxxx xxxx / xxxx xxxx
                </li>
              </ul>
            </div>
          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">

            <div className="text-center md:text-left space-y-1">
              <p className="text-gray-500 text-xs">
                © 2025 Fernando. Todos los derechos reservados.
              </p>
              <p className="text-[10px] text-gray-700">
                Hecho por: <span className="font-bold text-gray-600">Mario Morales</span>
                <span className="mx-1">•</span>
                Contacto: <a href="mailto:mora.sant.mario@gmail.com" className="hover:text-accent transition-colors">mora.sant.mario@gmail.com</a>
              </p>
            </div>

            <div className="flex gap-6 text-xs font-medium items-center">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                Aviso de Privacidad
              </button>

              <button
                onClick={() => setShowConditionModal(true)}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                Términos y Condiciones
              </button>

              <span className="text-gray-700 hidden sm:inline">|</span>

              <span className="text-accent font-bold">HECHO EN MÉXICO 🇲🇽</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modal de Privacidad */}
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}>
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
          <h3 className="text-2xl font-black text-white uppercase">Aviso de Privacidad</h3>
          <button
            onClick={() => setShowPrivacyModal(false)}
            className="text-gray-400 hover:text-white cursor-pointer text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="bg-white/5 p-6 rounded-xl text-center border border-dashed border-gray-600">
            <p className="text-xs text-gray-500">Sus datos personales (Dirección de envío, Teléfono) son utilizados únicamente para la logística de entrega de los costales.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowPrivacyModal(false)}
            className="bg-transparent border border-accent text-accent hover:bg-accent hover:text-white font-bold cursor-pointer px-6 py-2 rounded-full transition-colors uppercase text-xs"
          >
            Cerrar
          </button>
        </div>
      </Modal>

      {/* Modal de Términos y Condiciones */}
      <Modal isOpen={showConditionModal} onClose={() => setShowConditionModal(false)} maxWidth="max-w-4xl">
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
          <h3 className="text-2xl font-black text-white uppercase">Términos y Condiciones</h3>
          <button
            onClick={() => setShowConditionModal(false)}
            className="text-gray-400 cursor-pointer hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-300 pr-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="bg-bg p-4 rounded-lg border border-white/5">

            <h4 className="font-bold text-base text-gold mb-1">1. Uso del Producto</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>El carbón vegetal "El Ranchero" está diseñado exclusivamente para uso recreativo y culinario en exteriores (parrillas, asadores). Cualquier otro uso (industrial, calefacción interna) está estrictamente prohibido bajo estos términos.</p>

            <h4 className="font-bold text-base text-gold mb-1">2. Almacenamiento</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>El cliente es responsable de almacenar el producto en un lugar seco y alejado de fuentes de ignición. "El Ranchero" no se hace responsable por producto humedecido o dañado por mal almacenamiento después de la entrega.</p>

            <h4 className="font-bold text-base text-gold mb-1">3. Política de Devoluciones</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>Debido a la naturaleza del producto, solo se aceptan devoluciones si el costal presenta defectos de fábrica (roturas mayores al recibirlo) o si el peso es considerablemente menor al declarado. Debe reportarse en las primeras 24 horas.</p>

            <h4 className="font-bold text-base text-gold mb-1">4. Limitación de Responsabilidad</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>La empresa no se hace responsable por accidentes, incendios o intoxicaciones provocadas por negligencia, uso en interiores o falta de supervisión del fuego generado con nuestros productos.</p>

            <h4 className="font-bold text-base text-gold mb-1">5. Distribuidores</h4>
            <p className='text-xs space-y-1 mb-0 text-gray-400'>La reventa de este producto está permitida, pero la alteración del empaque, la mezcla con otros carbones de menor calidad o la venta bajo otra marca sin autorización constituye una violación de estos términos.</p>

          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowConditionModal(false)}
            className="bg-accent hover:bg-accent-hover text-white font-bold cursor-pointer px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-xs shadow-lg shadow-accent/20"
          >
            Acepto los términos
          </button>
        </div>
      </Modal>
    </>
  );
}
