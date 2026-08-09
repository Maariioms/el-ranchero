'use client'

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Building2, Phone, Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle, MessageSquare, MapPin, Search, ShoppingBag, Package, X, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('../components/MapPicker'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-surface animate-pulse rounded-lg flex items-center justify-center text-xs text-gray-500">Cargando Mapa...</div>
});

// Mismo catálogo que /productos — los id coinciden para poder llegar aquí
// con el producto ya preseleccionado vía ?producto=<id>
const PRODUCTOS = [
  { id: '1', label: 'Carbón El Ranchero (3 kg)' },
  { id: '2', label: 'Carbón El Ranchero (4 kg)' },
  { id: '3', label: 'Costal Carbón Mediano (10-35 kg)' },
  { id: '4', label: 'Costal Carbón Grande (20 kg)' },
  { id: '5', label: 'Costal Carbón Extra-Grande (30 kg)' },
  { id: '6', label: 'Costal Briquetas (10-20 kg)' },
  { id: '7', label: "Briquetas Ta' Con Madre (3 kg)" },
  { id: '8', label: 'Briquetas Sierra Madre (3 kg)' },
  { id: '9', label: 'Iniciadores de Fuego' },
  { id: '10', label: 'Ocote' },
  { id: 'otro', label: 'Otro / Mix de Productos' },
];

function ProductoQueryParamSync({ onProductoFound }: { onProductoFound: (id: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const producto = searchParams.get('producto');
    if (producto && PRODUCTOS.some((p) => p.id === producto)) {
      onProductoFound(producto);
    }
  }, [searchParams, onProductoFound]);

  return null;
}

type ProductoLine = { key: string; producto: string; cantidad: string };

let lineKeySeq = 0;
const newProductoLine = (producto = ''): ProductoLine => ({
  key: `line-${++lineKeySeq}`,
  producto,
  cantidad: '',
});

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
    frecuencia: '',
    mensaje: ''
  });

  // Productos de interés — mínimo 1 línea, se pueden agregar/quitar más
  const [productos, setProductos] = useState<ProductoLine[]>([newProductoLine()]);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSearchingMap, setIsSearchingMap] = useState(false);
  const [mapCoords, setMapCoords] = useState<{lat: number, lng: number} | null>(null); // Coordenadas para mover el mapa
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);
  const [cameFromCatalog, setCameFromCatalog] = useState(false);

  const handleProductoFound = (id: string) => {
    setProductos((prev) => {
      const copy = [...prev];
      copy[0] = { ...copy[0], producto: id };
      return copy;
    });
    setCameFromCatalog(true);
  };

  const updateProductoLine = (key: string, field: 'producto' | 'cantidad', value: string) => {
    setProductos((prev) => prev.map((line) => (line.key === key ? { ...line, [field]: value } : line)));
  };

  const addProductoLine = () => {
    setProductos((prev) => [...prev, newProductoLine()]);
  };

  const removeProductoLine = (key: string) => {
    setProductos((prev) => (prev.length <= 1 ? prev : prev.filter((line) => line.key !== key)));
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. VISTA DE ÉXITO (Post-envío)
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-accent selection:text-white">
        {/* Fondo */}
        <div className="absolute inset-0 bg-linear-to-b from-surface/50 to-bg"></div>

        <div className="max-w-md w-full mx-auto relative z-10 text-center">
          <div className="bg-surface border border-accent/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-accent/10 mb-6">
              <CheckCircle className="h-10 w-10 text-accent" />
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
              className="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-accent/20 text-sm font-bold text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-bg transition-all transform hover:scale-[1.02] uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
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
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-accent selection:text-white">

      <Suspense fallback={null}>
        <ProductoQueryParamSync onProductoFound={handleProductoFound} />
      </Suspense>

      {/* Fondo */}
      <div className="absolute inset-0 bg-linear-to-b from-surface/50 to-bg"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-lg w-full mx-auto relative z-10">

        {/* BOTÓN DE REGRESO */}
        <Link
          href="/"
          className="btn-press inline-flex items-center gap-2 mb-6 text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 rounded-full px-4 py-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al inicio
        </Link>

        {/* LOGO SUPERIOR */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
             <img
               src="/logo-solo-letras-negras.png"
               alt="Logo El Ranchero"
               className="mx-auto h-20 w-20 object-contain mb-4 group-hover:scale-105 transition-transform"
               style={{ filter: 'invert(1)' }}
             />
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">
               Alta de <span className="text-accent">Distribuidor</span>
             </h2>
             <p className="mt-2 text-sm text-gray-400 max-w-xs mx-auto">
               Déjanos tus datos y recibe precios preferenciales de mayoreo para tu negocio.
             </p>
          </Link>

          {cameFromCatalog && (
            <div className="mt-5 inline-flex items-center gap-1.5 bg-surface border border-accent/30 rounded-full px-4 py-1.5">
              <span className="text-xs text-gray-300 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-accent" />
                Cotizando: <span className="text-accent font-bold">{PRODUCTOS.find((p) => p.id === productos[0]?.producto)?.label}</span>
              </span>
            </div>
          )}
        </div>

        {/* CAJA DEL FORMULARIO */}
        <div className="bg-surface border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur-sm">

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
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors"
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
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors"
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
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors"
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
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors"
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
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors"
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

            {/* SELECCIÓN DE PRODUCTOS Y CANTIDAD */}
            <div className="space-y-5">

              {/* PRODUCTOS DE INTERÉS — una o más líneas, mínimo 1 */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase ml-1">
                  Producto{productos.length > 1 ? 's' : ''} de Interés
                </label>

                {productos.map((line, index) => (
                  <div key={line.key} className="flex gap-2 items-start">

                    {/* Custom Select de producto */}
                    <div className="relative flex-1">
                      <div
                        onClick={() => setOpenDropdownKey(openDropdownKey === line.key ? null : line.key)}
                        className={`relative w-full pl-10 pr-10 py-3 border rounded-lg bg-bg text-white text-sm cursor-pointer transition-colors flex items-center select-none ${
                            openDropdownKey === line.key ? 'border-accent ring-1 ring-accent' : 'border-white/10 hover:border-accent'
                        }`}
                      >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <ShoppingBag className={`h-5 w-5 transition-colors ${openDropdownKey === line.key ? 'text-accent' : 'text-gray-500'}`} />
                          </div>

                          <span className={`truncate ${line.producto ? 'text-white' : 'text-gray-500'}`}>
                              {line.producto
                                  ? PRODUCTOS.find(p => p.id === line.producto)?.label
                                  : "Selecciona una opción..."
                              }
                          </span>

                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <svg className={`h-4 w-4 fill-current text-gray-500 transition-transform duration-300 ${openDropdownKey === line.key ? 'rotate-180 text-accent' : ''}`} viewBox="0 0 20 20">
                                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                              </svg>
                          </div>
                      </div>

                      {/* Dropdown Menu */}
                      {openDropdownKey === line.key && (
                          <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownKey(null)}></div>
                              <div className="absolute z-20 mt-2 w-full bg-surface border border-accent/30 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
                                  {PRODUCTOS.map((p) => (
                                      <div
                                          key={p.id}
                                          onClick={() => {
                                              updateProductoLine(line.key, 'producto', p.id);
                                              setOpenDropdownKey(null);
                                          }}
                                          className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group ${
                                              line.producto === p.id
                                              ? 'bg-accent/20 text-accent font-bold'
                                              : 'text-gray-300 hover:bg-accent hover:text-white'
                                          }`}
                                      >
                                          {p.label}
                                          {line.producto === p.id && <CheckCircle className="w-4 h-4 text-accent" />}
                                      </div>
                                  ))}
                              </div>
                          </>
                      )}
                    </div>

                    {/* Cantidad de esta línea */}
                    <div className="relative w-24 shrink-0">
                      <input
                        type="number"
                        min="1"
                        required
                        value={line.cantidad}
                        onChange={(e) => updateProductoLine(line.key, 'cantidad', e.target.value)}
                        className="block w-full pl-3 pr-2 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Cant."
                      />
                    </div>

                    {/* Quitar línea — deshabilitado si es la única */}
                    <button
                      type="button"
                      onClick={() => removeProductoLine(line.key)}
                      disabled={productos.length <= 1}
                      aria-label="Quitar este producto"
                      className="shrink-0 h-[46px] w-[46px] flex items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-danger hover:border-danger/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:border-white/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Agregar otro producto */}
                <button
                  type="button"
                  onClick={addProductoLine}
                  className="btn-press inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar otro producto
                </button>
              </div>

              {/* FRECUENCIA — aplica al pedido completo */}
              <div className="grid grid-cols-1">

                  {/* Select Frecuencia */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase ml-1">
                      Frecuencia
                    </label>
                    <div className="relative">
                      <select
                        name="frecuencia"
                        required
                        className="block w-full pl-4 pr-8 py-3 border border-white/10 rounded-lg bg-bg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors appearance-none cursor-pointer hover:border-accent"
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
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-bg text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-colors resize-y h-32"
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
                className="btn-press group cursor-pointer relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-bg disabled:opacity-70 disabled:cursor-not-allowed transition-colors uppercase tracking-wide"
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
             Al enviar este formulario aceptas nuestro <a href="#" className="underline hover:text-accent">Aviso de Privacidad</a>.
             Tus datos son exclusivos para uso comercial de El Ranchero.
           </p>
        </div>

        {/* VOLVER AL INICIO */}
        <div className="mt-8 text-center">
           <Link href="/" className="inline-flex items-center text-gray-500 hover:text-accent transition-colors text-sm font-medium">
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