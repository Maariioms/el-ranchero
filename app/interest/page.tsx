'use client'

import { useState } from 'react';
import Link from 'next/link';
import { User, Building2, Phone, Mail, ArrowRight, Loader2, CheckCircle, MessageSquare, MapPin, Search, ShoppingBag } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('../components/MapPicker'), { 
  ssr: false,
  loading: () => <div className="h-[300px] bg-[#111] animate-pulse rounded-lg flex items-center justify-center text-xs text-gray-500">Cargando Mapa...</div>
});

const PRODUCTOS = [
  { id: 'costal-20', label: 'Costal Grande (20kg) - Restaurante' },
  { id: 'costal-30', label: 'Costal Jumbo (30kg) - Parrilla Industrial' },
  { id: 'costal-revuelto', label: 'Costal Revuelto (Económico)' },
  { id: 'briqueta-10', label: 'Caja Briquetas (10kg)' },
  { id: 'bolsa-4', label: 'Bolsa Retail (4kg) - Paquete de 50' },
  { id: 'bolsa-3', label: 'Bolsa Retail (3kg) - Paquete de 60' },
  { id: 'iniciadores', label: 'Caja Iniciadores (24 pzas)' },
  { id: 'otro', label: 'Otro / Mix de Productos' }
];

export default function ContactoDistribuidor() {
  
  // 1. ESTADOS
  const [formData, setFormData] = useState({
    nombre: '',
    negocio: '',
    telefono: '',
    email: '',
    direccion: '',
    lat: 0,
    lng: 0,
    producto: '', // <--- NUEVO
    cantidad: '', // <--- NUEVO
    frecuencia: '', // <--- NUEVO CAMPO
    mensaje: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSearchingMap, setIsSearchingMap] = useState(false);
  const [mapCoords, setMapCoords] = useState<{lat: number, lng: number} | null>(null); // Coordenadas para mover el mapa
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Para abrir/cerrar la lista

  // 1. LÓGICA DEL MAPA Y BÚSQUEDA DE DIRECCIÓN
  const handleAddressSearch = async () => {
    if (!formData.direccion) return;
    setIsSearchingMap(true);

    try {
      // Usamos la API gratuita de Nominatim (OpenStreetMap)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.direccion)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        // 1. Guardamos en el form
        setFormData(prev => ({ ...prev, lat, lng }));

        // 2. Mandamos la señal al mapa para que vuele ahí
        setMapCoords({ lat, lng });
      } else {
        alert("No encontramos esa dirección. Intenta ser más específico (Calle, Ciudad).");
      }
    } catch (error) {
      console.error("Error buscando dirección", error);
    } finally {
      setIsSearchingMap(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, lat, lng }));
  };

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
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase ml-1">
                Ubicación de entrega
              </label>

              <div className="relative flex gap-2">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                    type="text"
                    name="direccion"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                    placeholder="Calle, Colonia, Ciudad..."
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        // Si da Enter en el input, buscamos en lugar de enviar el form
                        if(e.key === 'Enter') {
                            e.preventDefault();
                            handleAddressSearch();
                        }
                    }}
                    />
                </div>

                {/* BOTÓN BUSCAR */}
                <button 
                    type="button" // Importante: type button para no enviar el form
                    onClick={handleAddressSearch}
                    disabled={isSearchingMap || !formData.direccion}
                    className="bg-[#333] hover:bg-[#444] text-white px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                    title="Buscar en mapa"
                >
                    {isSearchingMap ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Search className="h-5 w-5" />
                    )}
                </button>
              </div>

              {/* MAPA */}
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <MapPicker 
                    onLocationSelect={handleLocationSelect} 
                    externalCoords={mapCoords} 
                />
              </div>
            </div>

            {/* SELECCIÓN DE PRODUCTO Y CANTIDAD */}
            <div className="space-y-5">

              {/* 1. PRODUCTO (Fila completa) */}
              <div className="relative space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase ml-1">
                  Producto de Interés
                </label>

                {/* Custom Select */}
                <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`relative w-full pl-10 pr-10 py-3 border rounded-lg bg-[#0A0A0A] text-white text-sm cursor-pointer transition-colors flex items-center select-none ${
                        isDropdownOpen ? 'border-[#FD6A02] ring-1 ring-[#FD6A02]' : 'border-white/10 hover:border-[#FD6A02]'
                    }`}
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShoppingBag className={`h-5 w-5 transition-colors ${isDropdownOpen ? 'text-[#FD6A02]' : 'text-gray-500'}`} />
                    </div>

                    <span className={formData.producto ? 'text-white' : 'text-gray-500'}>
                        {formData.producto 
                            ? PRODUCTOS.find(p => p.id === formData.producto)?.label 
                            : "Selecciona una opción..."
                        }
                    </span>

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className={`h-4 w-4 fill-current text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#FD6A02]' : ''}`} viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute z-20 mt-2 w-full bg-[#111] border border-[#FD6A02]/30 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
                            {PRODUCTOS.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => {
                                        handleChange({ target: { name: 'producto', value: p.id } } as any);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group ${
                                        formData.producto === p.id 
                                        ? 'bg-[#FD6A02]/20 text-[#FD6A02] font-bold' 
                                        : 'text-gray-300 hover:bg-[#FD6A02] hover:text-white'
                                    }`}
                                >
                                    {p.label}
                                    {formData.producto === p.id && <CheckCircle className="w-4 h-4 text-[#FD6A02]" />}
                                </div>
                            ))}
                        </div>
                    </>
                )}
              </div>

              {/* 2. CANTIDAD Y FRECUENCIA (Fila compartida 50/50) */}
              <div className="grid grid-cols-2 gap-5">

                  {/* Input Cantidad */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase ml-1">
                      Cantidad
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="cantidad"
                        min="1"
                        required
                        className="block w-full pl-4 pr-12 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Ej. 20"
                        onChange={handleChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-xs font-bold bg-[#0A0A0A] pl-2">Pzas</span>
                      </div>
                    </div>
                  </div>

                  {/* Select Frecuencia */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase ml-1">
                      Frecuencia
                    </label>
                    <div className="relative">
                      <select
                        name="frecuencia"
                        required
                        className="block w-full pl-4 pr-8 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors appearance-none cursor-pointer hover:border-[#FD6A02]"
                        onChange={handleChange}
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona...</option>
                        <option value="unica">Una vez</option>
                        <option value="semanal">Semanal</option>
                        <option value="quincenal">Quincenal</option>
                        <option value="mensual">Mensual</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
              </div>

            </div>

            {/* CAMPO: MENSAJE / VOLUMEN */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Comentarios Adicionales (Opcional)
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
                  placeholder="Dudas sobre envío, horarios de recepción, etc."
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