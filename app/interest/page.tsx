'use client'

import { useState } from 'react';
import Link from 'next/link';
import { User, Building2, Phone, Mail, ArrowRight, Loader2, CheckCircle, MessageSquare, MapPin } from 'lucide-react';

export default function ContactoDistribuidor() {
  
  // 1. ESTADOS
  const [formData, setFormData] = useState({
    nombre: '',
    negocio: '',
    telefono: '',
    email: '',
    mensaje: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 2. LÓGICA DE ENVÍO
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // Simulación de envío a tu API / Backend / Correo
    // Aquí conectarías con tu endpoint real, por ejemplo: /api/leads
    setTimeout(() => {
      console.log('Datos enviados:', formData);
      setStatus('success');
      // Opcional: Redirigir a home después de unos segundos
      // router.push('/'); 
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. VISTA DE ÉXITO (Post-envío)
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#FD6A02] selection:text-white">
        {/* Fondo idéntico al Login */}
        <div className="absolute inset-0 bg-linear-to-br from-[#D32F2F]/10 via-[#0A0A0A] to-[#0A0A0A]"></div>
        
        <div className="max-w-md w-full mx-auto relative z-10 text-center">
          <div className="bg-[#111] border border-[#FD6A02]/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#FD6A02]/10 mb-6">
              <CheckCircle className="h-10 w-10 text-[#FD6A02]" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
              ¡Solicitud Recibida!
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Gracias, <span className="text-white font-bold">{formData.nombre}</span>. 
              <br/>
              Un asesor comercial analizará el perfil de <span className="text-white font-bold">{formData.negocio}</span> y te contactará al número proporcionado en menos de 24 horas.
            </p>
            <Link 
              href="/"
              className="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-[#FD6A02]/20 text-sm font-bold text-white bg-[#FD6A02] hover:bg-[#e55a00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6A02] focus:ring-offset-[#0A0A0A] transition-all transform hover:scale-[1.02] uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. VISTA DEL FORMULARIO
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#FD6A02] selection:text-white">
      
      {/* Fondo con brasas sutiles */}
      <div className="absolute inset-0 bg-linear-to-br from-[#D32F2F]/10 via-[#0A0A0A] to-[#0A0A0A]"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-lg w-full mx-auto relative z-10">
        
        {/* LOGO SUPERIOR */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
             <div className="mx-auto h-16 w-16 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(253,106,2,0.4)] mb-4 group-hover:scale-105 transition-transform">
                <img 
                  src="/logo.png" 
                  alt="Logo El Ranchero" 
                  className="w-full h-full object-contain" 
                />
             </div>
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">
               Alta de <span className="text-[#FD6A02]">Distribuidor</span>
             </h2>
             <p className="mt-2 text-sm text-gray-400 max-w-xs mx-auto">
               Déjanos tus datos y recibe precios preferenciales de mayoreo para tu negocio.
             </p>
          </Link>
        </div>

        {/* CAJA DEL FORMULARIO */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* CAMPO: NOMBRE CONTACTO */}
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  Tu Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Icono h-5 w-5 como en el Login */}
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    required
                    /* pl-10 para igualar al Login */
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                    placeholder="Ej. Juan Pérez"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* CAMPO: NOMBRE NEGOCIO */}
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  Nombre del Negocio
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="negocio"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                    placeholder="Ej. Tacos El Primo"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* CAMPO: TELÉFONO */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Teléfono / WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="tel"
                  name="telefono"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                  placeholder="(55) 1234 5678"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* CAMPO: CORREO */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                  placeholder="contacto@negocio.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* CAMPO: Direccion */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Dirección a entregar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="direccion"
                  name="direccion"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                  placeholder="Ej. Primavera 11, Naucalpan de Juarez, 53040"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* CAMPO: MENSAJE / VOLUMEN */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Volumen estimado o Dudas
              </label>
              <div className="relative">
                {/* Ajuste para textarea: top-3 y left-3 para alinearlo arriba a la izquierda */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </div>
                <textarea
                  name="mensaje"
                  style={{ minHeight: '80px' }}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors resize-y h-32"
                  placeholder="Ej. Necesito 20 costales a la semana..."
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* BOTÓN DE ENVÍO */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group cursor-pointer relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-linear-to-r from-[#FD6A02] to-[#D32F2F] hover:from-[#e55a00] hover:to-[#c62828] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6A02] focus:ring-offset-[#0A0A0A] disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] uppercase tracking-wide shadow-lg shadow-[#FD6A02]/20"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4 text-white" />
                    Enviando solicitud...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar Solicitud
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* NOTA DE PRIVACIDAD */}
        <div className="mt-6 text-center px-4">
           <p className="text-xs text-gray-500">
             Al enviar este formulario aceptas nuestro <a href="#" className="underline hover:text-[#FD6A02]">Aviso de Privacidad</a>. 
             Tus datos son exclusivos para uso comercial de El Ranchero.
           </p>
        </div>

        {/* VOLVER AL INICIO */}
        <div className="mt-8 text-center">
           <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#FD6A02] transition-colors text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a la página principal
           </Link>
        </div>

      </div>
    </div>
  );
}