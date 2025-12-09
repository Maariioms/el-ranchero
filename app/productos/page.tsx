'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Flame, Package, ShoppingBag, MessageSquareText, Truck, BookOpen, User, Briefcase, Menu, X, Boxes , Instagram, Twitter, MapPin } from 'lucide-react';

export default function Products() {
  
  // 1. ESTADOS
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos'); // 'todos', 'retail', 'mayoreo', 'especialidad'

  // 2. DATOS DE PRODUCTOS
  const products = [
    // RETAIL
    {
      id: 1,
      name: "Carbón El Ranchero 3 kg",
      description: "La medida perfecta para un asado familiar. Encendido rápido y brasa constante.",
      category: "Retail / Hogar",
      filterTag: "retail",
      img: "/ranchero-3.jpg", // Asegúrate de tener estas imágenes o borrar la propiedad si no
      tag: "Más Vendido",
      popular: true
    },
    {
      id: 2,
      name: "Carbón El Ranchero 4 kg",
      description: "Más rendimiento para parrilladas de fin de semana. Ideal para supermercados.",
      category: "Retail / Hogar",
      filterTag: "retail",
      img: "/ranchero-4.jpg",
      popular: false
    },
    // MAYOREO
    {
      id: 3,
      name: "Costal 20-35 kg (Revuelto)",
      description: "Tamaño Mediano. Excelente relación costo-beneficio para taquerías y parrillas.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo",
      icon: <Package className="h-12 w-12" />,
      popular: false
    },
    {
      id: 4,
      name: "Costal 20 kg (Grande)",
      description: "Trozos seleccionados de gran tamaño. Mayor duración de brasa para cortes gruesos.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo",
      icon: <Package className="h-12 w-12" />,
      tag: "Calidad Premium",
      popular: true
    },
    {
      id: 5,
      name: "Costal 30 kg (Extra-Grande)",
      description: "El gigante del sabor. Carbón de alta densidad para jornadas largas de cocina.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo",
      icon: <Truck className="h-12 w-12" />,
      popular: false
    },
    // ESPECIALIDAD
    {
      id: 6,
      name: "Briquetas Sierra Madre",
      description: "Calor uniforme y controlado. Perfectas para ahumados y cocciones lentas.",
      category: "Especialidad",
      filterTag: "especialidad",
      img: "/briqueta.jpeg",
      popular: false
    },
    {
      id: 7,
      name: "Briquetas Ta' Con Madre",
      description: "Alto rendimiento calórico. La favorita de los expertos en grill.",
      category: "Especialidad",
      filterTag: "especialidad",
      img: "/briqueta1.jpg",
      tag: "Nuevo",
      popular: false
    },
    {
      id: 8,
      name: "Iniciadores de Fuego",
      description: "Olvídate del papel y el aceite. Enciende tu carbón en minutos sin esfuerzo.",
      category: "Accesorios",
      filterTag: "retail",
      img: "/iniciador.jpg",
      popular: false
    },
  ];

  // 3. LÓGICA DE FILTRADO
  const filteredProducts = activeFilter === 'todos' 
    ? products 
    : products.filter(p => p.filterTag === activeFilter);

  return (
    // LIENZO MAESTRO
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#FD6A02] selection:text-white relative overflow-hidden">
      
      {/* LUCES GLOBALES (FONDO INFINITO) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600] bg-[#FD6A02]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#D32F2F]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* CONTENIDO (Z-10 para estar encima de las luces) */}
      <div className="relative z-10">

        {/* --- HEADER COMPLETO --- */}
        <header className="bg-[#0A0A0A]/95 border-b border-[#FD6A02]/20 sticky top-0 z-50 backdrop-blur-md shadow-lg shadow-black/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center h-20">

              {/* 1. LOGO EL RANCHERO */}
              <Link href="/" className="flex items-center gap-2 group">
                {/* Contenedor del Icono con gradiente bg-linear-to-br from-[#FD6A02] to-[#D32F2F]*/}
                <div className=" p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(253,106,2,0.6)] transition-all">
                   <img 
                     src="/logo.png" 
                     alt="Logo El Ranchero" 
                     className="w-8 h-8 object-contain" 
                   />
                </div>

                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-none group-hover:text-[#FD6A02] transition-colors">
                    El Ranchero
                  </span>
                  <span className="text-[10px] text-[#FD6A02] font-bold tracking-[0.2em] uppercase">
                    Carbón de Leña
                  </span>
                </div>
              </Link>

              {/* 2. MENÚ CENTRAL (Para todo el público) */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/productos" className="text-sm font-bold text-gray-300 hover:text-[#FD6A02] transition-colors uppercase tracking-wide flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4 mb-0.5" />
                  Productos
                </Link>
                <Link href="/blog" className="text-sm font-bold text-gray-300 hover:text-[#FD6A02] transition-colors uppercase tracking-wide flex items-center gap-1">
                  <BookOpen className="w-4 h-4 mb-0.5" />
                  Zona Parrillera
                </Link>
                <Link href="/tradicion" className="text-sm font-bold text-gray-300 hover:text-[#FD6A02] transition-colors uppercase tracking-wide flex items-center gap-1">
                  <Flame className="w-4 h-4 mb-0.5" />
                  Tradición
                </Link>
              </nav>

              {/* 3. ACCIONES DERECHA (Área B2B / Negocios) */}
              <div className="hidden md:flex items-center gap-6">

                {/* Separador vertical sutil */}
                <div className="h-8 w-1px bg-white/10"></div>

                {/* Login: Solo para quienes ya tienen ID/Cuenta */}
                <Link
                  href="/login"
                  className="group flex items-center gap-2 text-sm font-bold text-white hover:text-[#FFD700] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FFD700] group-hover:bg-[#FFD700]/10 transition-all">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] text-gray-500 uppercase font-normal mb-0.5">Ya soy socio</span>
                    <span>Acceso Clientes</span>
                  </div>
                </Link>

                {/* CTA: Para nuevos interesados (Lleva a formulario, no a registro) */}
                <Link
                  href="/interest"
                  className="bg-[#FD6A02] hover:bg-[#e55a00] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(253,106,2,0.3)] hover:shadow-[0_0_25px_rgba(253,106,2,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Quiero ser Distribuidor / Socio
                </Link>
              </div>

              {/* Botón Menú Móvil */}
              <button 
                className="md:hidden text-white hover:text-[#FD6A02] transition-colors p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL (Desplegable) */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 animate-fade-in-down absolute w-full left-0 shadow-2xl">
              <div className="px-4 py-6 space-y-2">

                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Explora</p>
                <Link href="/productos" className="block px-3 py-2 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-[#FD6A02]">
                  Nuestros Productos
                </Link>
                <Link href="/blog" className="block px-3 py-2 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-[#FD6A02]">
                  Zona Parrillera
                </Link>
                <Link href="/historia" className="block px-3 py-2 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-[#FD6A02]">
                  Nuestra Historia
                </Link>

                <div className="h-px bg-white/10 my-4 mx-2"></div>

                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Distribuidores</p>

                <Link href="/login" className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white">
                  <User className="w-5 h-5 text-[#FD6A02]" />
                  <div>
                    <span className="block font-bold">Ingresar al Sistema</span>
                    <span className="text-xs text-gray-500">Gestión de pedidos y facturas</span>
                  </div>
                </Link>

                <Link href="/contacto-distribuidor" className="flex items-center justify-center gap-2 w-full bg-[#FD6A02] text-white py-3 rounded-lg font-bold mt-4 shadow-lg shadow-[#FD6A02]/20 active:scale-95 transition-transform">
                  <Briefcase className="w-4 h-4" />
                  Solicitar Alta de Cliente
                </Link>
              </div>
            </div>
          )}
        </header>
        
        {/* HERO SECTION PRODUCTOS */}
        
        <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
            <span className="text-[#FD6A02] font-bold tracking-widest text-sm uppercase mb-4 block animate-fade-in">
                Catálogo 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight tracking-tight">
                Calidad que <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#D32F2F]">Enciende</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Desde bolsas para el asado del domingo hasta abastecimiento industrial para restaurantes. 
                Tenemos el carbón perfecto para cada necesidad.
            </p>

            {/* --- BARRA DE FILTROS --- */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
                {[
                    { id: 'todos', label: 'Ver Todo' },
                    { id: 'retail', label: 'Hogar (Retail)' },
                    { id: 'mayoreo', label: 'Restaurantes (Mayoreo)' },
                    { id: 'especialidad', label: 'Especialidades' }
                ].map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all border cursor-pointer ${
                            activeFilter === filter.id 
                            ? 'bg-[#FD6A02] border-[#FD6A02] text-white shadow-lg shadow-[#FD6A02]/20' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#FD6A02] hover:text-white'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
                {filteredProducts.map((product) => (
                    <div 
                    key={product.id}
                    className="group relative w-full max-w-[380px] mx-auto bg-[#111]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD6A02]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,106,2,0.1)] hover:-translate-y-1 flex flex-col"
                    >

                    {/* ETIQUETA */}
                    {product.tag && (
                        <div className="absolute top-4 right-4 z-20">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FD6A02] text-white shadow-lg">
                            {product.tag}
                        </span>
                        </div>
                    )}

                    <div className="h-64 bg-[#0F0F0F]/50 relative flex items-center justify-center p-4 group-hover:bg-[#141414]/50 transition-colors">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,106,2,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {product.img ? (
                        <img 
                            src={product.img} 
                            alt={product.name}
                            // 3. EL SECRETO: max-h-[180px]
                            // Esto obliga a la imagen a ser "chiquitina" (máx 180px de alto)
                            // aunque el contenedor mida 256px. Se verá centrada y con aire.
                            className="w-auto h-auto max-h-[300px] max-w-[300px] object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 relative z-10"
                        />
                        ) : (
                        <div className="text-gray-600 group-hover:text-[#FD6A02] transition-colors duration-300 transform group-hover:scale-110 relative z-10">
                            {/* También limitamos el icono */}
                            <div className="scale-125">
                                {product.icon}
                            </div>
                        </div>
                        )}
                    </div>

                    {/* CONTENIDO */}
                    <div className="p-6 flex-1 flex flex-col relative">
                        <div className="text-xs font-bold text-[#FD6A02] mb-2 uppercase tracking-wide">
                            {product.category}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FD6A02] transition-colors leading-tight">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1">
                            {product.description}
                        </p>

                        {/* BOTONES LÓGICOS (Corregido) */}
                        <div className="mt-auto text-center">
                            {product.filterTag === 'mayoreo' ? (
                                // CASO 1: MAYOREO (Solo cotizar volumen)
                                <Link 
                                    href="/contacto-distribuidor" 
                                    className="inline-flex items-center justify-center px-3 py-4 text-sm font-bold rounded-full text-white bg-[#FD6A02] hover:bg-[#e55a00] shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] transition-all transform hover:-translate-y-1 gap-2 uppercase tracking-wide"
                                >
                                    Cotizar Volumen
                                    <Boxes className="h-4 w-4" />
                                </Link>
                            ) : (
                                // CASO 2: RETAIL / ESPECIALIDAD (Doble opción: Vender o Consumir)
                                <div className="space-y-3">
                                    {/* Opción A: Quiero Vender (Negocio) */}
                                    <Link 
                                        href="/contacto-distribuidor" 
                                        className="inline-flex items-center justify-center px-3 py-4 text-sm font-bold rounded-full text-white bg-[#FD6A02] hover:bg-[#e55a00] shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] transition-all transform hover:-translate-y-1 gap-2 uppercase tracking-wide"
                                    >
                                        Quiero Distribuir
                                        <Briefcase className="h-4 w-4" />
                                    </Link>

                                    {/* Opción B: Consumo Personal (Cliente final) */}
                                    <button 
                                        // Aquí puedes abrir un modal con las tiendas o mandar a una página de "Donde comprar"
                                        onClick={() => alert("Próximamente: Lista de tiendas (Soriana, HEB, etc.)")}
                                        className="w-full inline-flex justify-center items-center gap-1.5 text-[10px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <MapPin className="h-3 w-3 text-[#FD6A02] mr-1" />
                                        ¿Buscas para consumo personal?
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                        
                    </div>
                ))}

            </div>
        </div>

        {/* CTA FINAL: ENFOQUE SOPORTE / CONTACTO */}
        <div className="border-t border-white/10 bg-[#0F0F0F]/80 backdrop-blur-sm py-20 relative overflow-hidden mt-12">
            {/* Luz ambiental sutil */}
            <div className="absolute inset-0 bg-linear-to-t from-[#FD6A02]/5 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                    ¿Tienes dudas o necesitas ayuda?
                </h2>

                <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                    Ya sea para confirmar cobertura de envíos, preguntar sobre precios especiales o resolver cualquier inquietud. Nuestro equipo está listo para escucharte.
                </p>

                <Link 
                    href="/contacto-distribuidor"
                    className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full text-white bg-[#FD6A02] hover:bg-[#e55a00] shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] transition-all transform hover:-translate-y-1 gap-2 uppercase tracking-wide"
                >
                    Contactar Ahora
                    <MessageSquareText className="w-6 h-6" />
                </Link>
            </div>
        </div>

        {/* FOOTER (Simple para esta página) */}
        <footer className="bg-[#050505] border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-600 text-xs mb-4">
                  © 2025 Salvador González Tolentino. Todos los derechos reservados.
                </p>
                <div className="flex justify-center gap-6">
                    <Link href="/" className="text-gray-500 hover:text-[#FD6A02] text-sm">Inicio</Link>
                    <Link href="/contacto-distribuidor" className="text-gray-500 hover:text-[#FD6A02] text-sm">Contacto</Link>
                </div>
            </div>
        </footer>

      </div>
    </div>
  );
}