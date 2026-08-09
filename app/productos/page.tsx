'use client'

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, MessageSquareText, Briefcase, X, Boxes } from 'lucide-react';

type TipoProducto = 'carbon' | 'briqueta' | 'iniciador';

const TIPO_LABELS: Record<TipoProducto, string> = {
  carbon: 'Carbón',
  briqueta: 'Briquetas',
  iniciador: 'Iniciadores',
};

function TipoQueryParamSync({ onTipoChange }: { onTipoChange: (tipo: TipoProducto | null) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tipo = searchParams.get('tipo');
    if (tipo === 'carbon' || tipo === 'briqueta' || tipo === 'iniciador') {
      onTipoChange(tipo);
    } else {
      onTipoChange(null);
    }
  }, [searchParams, onTipoChange]);

  return null;
}

export default function Products() {

  // 1. ESTADOS
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState<TipoProducto | null>(null);

  // 2. DATOS DE PRODUCTOS (Con copy más "Ranchero")
  const products = [
    // RETAIL
    {
      id: 1,
      name: "Carbón El Ranchero",
      description: "La bolsa clásica. Perfecta para la carnita asada del domingo con la familia.", // Más coloquial
      category: "Retail / Hogar",
      filterTag: "retail",
      tipo: "carbon" as TipoProducto,
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
      tipo: "carbon" as TipoProducto,
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
      tipo: "carbon" as TipoProducto,
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
      tipo: "carbon" as TipoProducto,
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
      tipo: "carbon" as TipoProducto,
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
      tipo: "briqueta" as TipoProducto,
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
      tipo: "briqueta" as TipoProducto,
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
      tipo: "briqueta" as TipoProducto,
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
      tipo: "iniciador" as TipoProducto,
      img: "/iniciador.jpg",
      popular: false
    },
    {
      id: 10,
      name: "Ocote",
      description: "Cero batallar. Prende tu carbón en minutos sin hacer corajes ni usar aceite.",
      category: "Accesorios",
      filterTag: "retail",
      tipo: "iniciador" as TipoProducto,
      img: "/ocote.jpg",
      popular: false
    },
  ];

  const filteredProducts = products
    .filter(p => activeFilter === 'todos' || p.filterTag === activeFilter)
    .filter(p => tipoFilter === null || p.tipo === tipoFilter);

  return (
    <div className="min-h-screen bg-bg font-sans selection:bg-accent selection:text-white">

      <Suspense fallback={null}>
        <TipoQueryParamSync onTipoChange={setTipoFilter} />
      </Suspense>

      {/* --- HEADER --- (Mantenemos tu header, se ve bien) */}
      <Navbar />
      
      {/* LUCES GLOBALES */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-danger/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="pt-5 relative z-10">

        
        {/* HERO SECTION PRODUCTOS */}
        <div className="relative pt-20 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
            <span className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block animate-fade-in">
                Catálogo 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight tracking-tight">
                Calidad que <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-danger">Enciende</span>
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
                            ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-accent hover:text-white'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 cursor-pointer">

            {tipoFilter && (
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3 bg-surface border border-accent/30 rounded-full pl-5 pr-2 py-2 animate-fade-in">
                        <span className="text-sm text-gray-300">
                            Mostrando: <span className="text-accent font-bold">{TIPO_LABELS[tipoFilter]}</span>
                        </span>
                        <Link
                            href="/productos"
                            className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors inline-flex items-center gap-1"
                        >
                            <X className="w-3 h-3" />
                            Quitar filtro
                        </Link>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">

              {filteredProducts.map((product) => {
                  const ctaLabel = product.filterTag === 'mayoreo' ? 'Cotizar volumen' : 'Quiero distribuir';
                  const CtaIcon = product.filterTag === 'mayoreo' ? Boxes : Briefcase;

                  return (
                  <Link
                    key={product.id}
                    href={`/interest?producto=${product.id}`}
                    className="group w-full max-w-[340px] mx-auto block"
                  >
                        <div className="bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col h-full">

                            {/* IMAGEN */}
                            <div className="relative h-56 bg-surface/50 flex items-center justify-center p-6 shrink-0">
                                {(product.popular || product.tag) && (
                                    <span className="absolute top-4 left-0 z-20 inline-block bg-accent text-white text-[10px] font-black px-4 py-1.5 rounded-r-lg uppercase tracking-widest">
                                        {product.tag || "Más Vendido"}
                                    </span>
                                )}

                                {product.img && (
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-auto h-auto max-h-40 max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    />
                                )}
                            </div>

                            {/* CONTENIDO — siempre visible, sin depender de hover */}
                            <div className="p-6 flex flex-col grow bg-surface/40">

                                <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide group-hover:text-accent transition-colors">
                                    {product.category}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                    {product.name}
                                </h3>

                                {product.weights && (
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {product.weights.map((weight, i) => (
                                            <div key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400 text-[10px] font-bold">
                                                <ShoppingBag className="w-3 h-3 text-accent" />
                                                {weight}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p className="text-gray-400 text-xs leading-relaxed pt-2 mb-4 border-t border-white/5">
                                    {product.description}
                                </p>

                                {/* Indicador de acción — discreto, la tarjeta entera es el CTA */}
                                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-accent text-xs font-bold uppercase tracking-wide">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CtaIcon className="w-3.5 h-3.5" />
                                        {ctaLabel}
                                    </span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>

                        </div>
                  </Link>
                  );
              })}

            </div>
        </div>

        {/* CTA FINAL: ENFOQUE SOPORTE / CONTACTO */}
        <div className="border-t border-white/10 bg-linear-to-b from-surface/80 to-bg mt-12">
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

                <div className="max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
                    ¿No encuentras lo que buscas?
                  </h2>
                  <p className="text-gray-400">
                    Cobertura de envíos, precios por volumen o cualquier duda — escríbenos directo.
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-gray-500 font-bold uppercase tracking-wide">
                    <span>CDMX y Edo. Méx</span>
                    <span>·</span>
                    <span>Respuesta en 24 hrs</span>
                    <span>·</span>
                    <span>Precios por volumen</span>
                  </div>
                </div>

                <Link
                    href="/interest"
                    className="btn-press shrink-0 inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-lg text-white bg-accent hover:bg-accent-hover transition-colors gap-2 uppercase tracking-wide"
                >
                    Contactar Ahora
                    <MessageSquareText className="w-4 h-4" />
                </Link>

              </div>
            </div>
        </div>

        <Footer />

      </div>
    </div>
  );
}