'use client'

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Flame, Package, ShoppingBag, MessageSquareText, Truck, MapPin, Star, User, Briefcase, Menu, X, Boxes, BookOpen, Store } from 'lucide-react'; // Agregué Store

export default function Products() {
  
  // 1. ESTADOS
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');

  // 2. DATOS DE PRODUCTOS (Con copy más "Ranchero")
  const products = [
    // RETAIL
    {
      id: 1,
      name: "Carbón El Ranchero",
      description: "La bolsa clásica. Perfecta para la carnita asada del domingo con la familia.", // Más coloquial
      category: "Retail / Hogar",
      filterTag: "retail",
      img: "/ranchero-3.jpg",
      tag: "El Favorito", // Más personal
      weights: ["3 KG"], 
      popular: true
    },
    {
      id: 2,
      name: "Carbón El Ranchero",
      description: "Un poquito más de power. Ideal si vas a echar cortes más gruesos o son más invitados.",
      category: "Retail / Hogar",
      filterTag: "retail",
      img: "/ranchero-4.jpg",
      weights: ["4 KG"], 
      popular: false
    },
    // MAYOREO
    {
      id: 3,
      name: "Costal (Carbón Mediano)",
      description: "El caballito de batalla. Rendidor y económico para taquerías que no paran.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo",
      img: "/costales.jpg",
      weights: ["10 KG", "20 KG", "35 KG"], 
      popular: false
    },
    {
      id: 4,
      name: "Costal (Carbón Grande)",
      description: "Puro trozo grande seleccionado. Calor intenso y duradero para parrillas exigentes.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo",
      img: "/costales.jpg",
      tag: "Calidad Premium",
      weights: ["20 KG"],
      popular: true
    },
    {
      id: 5,
      name: "Costal (Carbón Extra-Grande)",
      description: "Para los pesos pesados. Alta densidad para jornadas maratónicas de cocina.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo",
      img: "/costales.jpg",
      weights: ["30 KG"],
      popular: false
    },
    {
      id: 6,
      name: "Costal Briquetas",
      description: "Alta densidad para máximo rendimiento. Calor uniforme ideal para rosticeros y ahumados largos.",
      category: "Mayoreo / Restaurante",
      filterTag: "mayoreo", 
      img: "/costales.jpg",
      weights: ["10 KG", "20 KG"],
      popular: false
    },
    // ESPECIALIDAD
    {
      id: 7,
      name: "Briquetas Ta' Con Madre",
      description: "Pum para arriba. Alto rendimiento calórico para sellar como profesional.",
      category: "Especialidad",
      filterTag: "especialidad",
      img: "/briqueta1.jpg",
      weights: ["3 KG"], 
      tag: "Nuevo",
      popular: false
    },
    {
      id: 8,
      name: "Briquetas Sierra Madre",
      description: "Calor de relojito. Uniforme y controlado, ideal para ahumados low & slow.",
      category: "Especialidad",
      filterTag: "especialidad",
      img: "/briqueta.jpeg",
      weights: ["3 KG"], 
      popular: false
    },
    {
      id: 9,
      name: "Iniciadores de Fuego",
      description: "Cero batallar. Prende tu carbón en minutos sin hacer corajes ni usar aceite.",
      category: "Accesorios",
      filterTag: "retail",
      img: "/iniciador.jpg",
      popular: false
    },
    {
      id: 10,
      name: "Ocote",
      description: "Cero batallar. Prende tu carbón en minutos sin hacer corajes ni usar aceite.",
      category: "Accesorios",
      filterTag: "retail",
      img: "/ocote.jpg",
      popular: false
    },
  ];

  const filteredProducts = activeFilter === 'todos' 
    ? products 
    : products.filter(p => p.filterTag === activeFilter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#FD6A02] selection:text-white">
      
      {/* --- HEADER --- (Mantenemos tu header, se ve bien) */}
      <Navbar />
      
      {/* LUCES GLOBALES */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#D32F2F]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="pt-5 relative z-10">

        
        {/* HERO SECTION PRODUCTOS */}
        <div className="relative pt-20 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
            <span className="text-[#FD6A02] font-bold tracking-widest text-sm uppercase mb-4 block animate-fade-in">
                Catálogo 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight tracking-tight">
                Calidad que <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#D32F2F]">Enciende</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Desde la bolsa para la carne asada del domingo hasta el abasto industrial para tu cadena. 
                Tenemos el carbón justo para lo que necesitas.
            </p>

            {/* BARRA DE FILTROS */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
                {[
                    { id: 'todos', label: 'Todo el Asador' }, // Nombres más creativos
                    { id: 'retail', label: 'Pa\' la Casa (Retail)' },
                    { id: 'mayoreo', label: 'Pa\'l Negocio (Mayoreo)' },
                    { id: 'especialidad', label: 'Gourmet' }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> {/* Ajuste de gap */}
            
              {filteredProducts.map((product) => (
                    // 1. EL "FANTASMA": Este div guarda el espacio en el grid y no se mueve.
                    // Ajusta h-[420px] según la altura "cerrada" de tus tarjetas para que no queden huecos.
                  <div key={product.id} className="relative w-full max-w-[340px] mx-auto h-[350px] group z-0 hover:z-50">

                        {/* 2. LA TARJETA REAL: Se posiciona absoluta para poder crecer libremente */}
                        <div className="absolute top-0 left-0 w-full min-h-full bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD6A02]/50 transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.8)] hover:shadow-[#FD6A02]/20 flex flex-col">

                            {/* ETIQUETA "MÁS VENDIDO" */}
                            {(product.popular || product.tag) && (
                                <div className="absolute top-6 left-0 z-20">
                                    <span className="inline-block bg-[#FD6A02] text-white text-[10px] font-black px-4 py-1.5 rounded-r-lg shadow-lg shadow-[#FD6A02]/20 uppercase tracking-widest">
                                        {product.tag || "Más Vendido"}
                                    </span>
                                </div>
                            )}

                            {/* IMAGEN */}
                            <div className="h-56 bg-[#0F0F0F]/50 relative flex items-center justify-center p-6 shrink-0">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,106,2,0.08),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {product.img ? (
                                    <img 
                                        src={product.img} 
                                        alt={product.name}
                                        className="w-auto h-auto max-h-40 max-w-[200px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    />
                                ) : (
                                    <div className="text-gray-600 group-hover:text-[#FD6A02] transition-colors duration-300 transform group-hover:scale-110 relative z-10 scale-125">
                                    </div>
                                )}
                            </div>

                            {/* CONTENIDO (Aquí ocurre la magia de expansión) */}
                            <div className="p-6 flex flex-col bg-[#111]/40 h-full">

                                <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide group-hover:text-[#FD6A02] transition-colors">
                                    {product.category}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                    {product.name}
                                </h3>

                                {/* Fila de Pesos (Siempre visible) */}
                                {product.weights && (
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {product.weights.map((weight, i) => (
                                            <div key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400 text-[10px] font-bold">
                                                <ShoppingBag className="w-3 h-3 text-[#FD6A02]" />
                                                {weight}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* DESCRIPCIÓN OCULTA (Se despliega empujando lo de abajo, pero como es absoluta, flota sobre el resto) */}
                                <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-45 group-hover:opacity-100 group-hover:mb-4">
                                    <p className="text-gray-400 text-xs leading-relaxed pt-2 border-t border-white/5">
                                        {product.description}
                                    </p>

                                    {/* BOTONES */}
                                    <div className="mt-4 space-y-3 pt-2">
                                        {product.filterTag === 'mayoreo' ? (
                                            <Link 
                                                href="/contacto-distribuidor" 
                                                className="hover:-translate-y-1 w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg bg-[#FD6A02] text-xs font-bold text-white hover:bg-[#e55a00] transition-all shadow-lg hover:shadow-[#FD6A02]/40 uppercase tracking-wide"
                                            >
                                                Cotizar Volumen
                                                <Boxes className="ml-2 h-4 w-4" />
                                            </Link>

                                            
                                        ) : (
                                            <div className="space-y-3">
                                                <Link 
                                                    href="/contacto-distribuidor" 
                                                    className="hover:-translate-y-1 w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg bg-[#FD6A02] text-xs font-bold text-white hover:bg-[#e55a00] transition-all shadow-lg hover:shadow-[#FD6A02]/40 uppercase tracking-wide"
                                                >
                                                    Quiero Distribuir
                                                    <Briefcase className="ml-2 h-4 w-4" />
                                                </Link>

                                                <button 
                                                    onClick={() => alert("Próximamente: Lista de tiendas")}
                                                    className="hover:-translate-y-0.5 mt-4 w-full inline-flex justify-center items-center gap-1.5 text-[10px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                                                >
                                                    <MapPin className="h-3 w-3 text-[#FD6A02] mr-1" />
                                                    Ver puntos de venta
                                                </button>

                                            </div>
                                        )}
                                    </div>
                                
                                </div>
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
                  ¿No encuentras lo que buscas?
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
                  © 2025 Fernando González Tolentino. Todos los derechos reservados.
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