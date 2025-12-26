"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { Flame, MapPin, Anchor, Target, ArrowRight, Star, Clock } from "lucide-react";

export default function HistoriaPage() {
  const milestones = [
    {
      year: "1923",
      title: "La Primera Chispa",
      description:
        "En los montes de Tamaulipas, Don Salvador inicia el oficio: tronco por tronco, fuego lento y respeto por la madera.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
    },
    {
      year: "1960",
      title: "El Fuego Viaja",
      description:
        "El mezquite cruza el país. El humo norteño llega al centro y encuentra nuevas mesas alrededor del fuego.",
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2000&auto=format&fit=crop",
    },
    {
      year: "1995",
      title: "Fuerza y Oficio",
      description:
        "La producción crece, el método no cambia. Escala industrial con alma artesanal.",
      image:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2000&auto=format&fit=crop",
    },
    {
      year: "2025",
      title: "La Era Digital",
      description:
        "Un siglo después, la tradición encuentra nuevas rutas sin perder su origen.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Textura sutil */}
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay" style={{
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/asfalt-light.png)",
      }} />

      <Navbar />

      {/* HERO */}
      <section className="py-40 text-center relative">
        <span className="inline-block mb-6 text-xs tracking-[0.3em] text-[#FD6A02] uppercase">
          Desde 1923
        </span>
        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">
          Un Siglo<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] via-[#FFD700] to-[#D32F2F]">
            Encendiendo
          </span><br />
          Momentos
        </h1>
        <p className="mt-10 max-w-2xl mx-auto text-gray-400 text-lg">
          El fuego no se inventa. Se hereda, se cuida y se comparte alrededor de la mesa.
        </p>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 grid grid-cols-2 md:grid-cols-4">
        {[
          { num: "102", label: "Años de Historia", icon: <Clock /> },
          { num: "+50k", label: "Toneladas/Año", icon: <Flame /> },
          { num: "4", label: "Estados", icon: <MapPin /> },
          { num: "100%", label: "Orgullo Mexicano", icon: <Star /> },
        ].map((s, i) => (
          <div key={i} className="py-14 text-center">
            <div className="flex justify-center text-[#FD6A02] opacity-70 mb-3">{s.icon}</div>
            <div className="text-4xl font-black">{s.num}</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* TIMELINE */}
      <section className="py-40 relative">
        {/* Línea central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#FD6A02]/40 to-transparent hidden md:block" />

        <h2 className="text-center text-xs tracking-[0.5em] uppercase text-gray-500 mb-32">
          Nuestra Trayectoria
        </h2>

        <div className="max-w-6xl mx-auto space-y-48 px-6">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`relative grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? "md:text-left" : "md:text-right"}`}
            >
              {/* Nodo */}
              <div className="absolute left-1/2 -top-6 w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#FD6A02] hidden md:block -translate-x-1/2 shadow-[0_0_20px_rgba(253,106,2,0.6)]" />

              {/* Imagen simbólica */}
              <div className={`relative h-80 md:h-[420px] rounded-xl overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                <img
                  src={m.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-25"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-black" />
              </div>

              {/* Texto */}
              <div className="relative z-10">
                <div className="text-6xl font-black text-[#FD6A02] mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(253,106,2,0.6)]">
                  {m.year}
                </div>
                <h3 className="text-3xl font-bold mb-6">{m.title}</h3>
                <p className="text-gray-400 max-w-md mx-auto md:mx-0 text-lg leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFIESTO */}
      <section className="py-40 text-center relative">
        <Flame className="w-14 h-14 mx-auto mb-10 text-[#FD6A02] animate-[pulse_4s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(253,106,2,0.7)]" />
        <h2 className="text-4xl md:text-7xl font-black uppercase leading-tight max-w-5xl mx-auto">
          No vendemos carbón.<br />
          Vendemos la <span className="text-[#FD6A02]">excusa</span> para reunirnos.
        </h2>
        <p className="mt-10 text-xl text-gray-400 max-w-3xl mx-auto">
          Cocinar lento, con humo real y gente alrededor del fuego. Esa es nuestra promesa.
        </p>
      </section>

      {/* CTA FINAL RECARGADO */}
      <section className="py-40 px-4 relative overflow-hidden">

        {/* Glow ambiental externo (detrás de la tarjeta) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FD6A02]/20 rounded-full blur-[120px] pointer-events-none" />

        {/* LA TARJETA CONTENEDORA */}
        <div className="relative z-10 max-w-5xl mx-auto bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden isolate shadow-2xl">

           {/* 1. Textura y Luces Internas */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(253,106,2,0.15),transparent_60%)] pointer-events-none" />
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url(https://www.transparenttextures.com/patterns/carbon-fibre.png)" }}></div>

           {/* 2. Marca de Agua (Flama Gigante) */}
           <div className="absolute -bottom-20 -right-20 text-[#FD6A02] opacity-[0.05] rotate-12 pointer-events-none">
              <Flame className="w-96 h-96" />
           </div>

           <div className="relative z-10 text-center py-24 px-6 md:px-12">

             {/* Badge Superior */}
             <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FD6A02]/30 bg-[#FD6A02]/10 text-[#FD6A02] text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                <Star className="w-3 h-3 fill-current" />
                Legado & Negocio
             </span>

             <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
               Escribe el <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-gray-500">
                 Siguiente Capítulo
               </span>
             </h2>

             <p className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
               Lleva esta tradición a tus clientes y forma parte de un legado que sigue <span className="text-white font-medium">encendiendo mesas</span> en todo el país.
             </p>

             <Link
               href="/interest"
               className="cursor-pointer group bg-[#FD6A02] hover:bg-[#e55a00] px-12 py-6 font-black text-xl md:text-2xl text-white transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(253,106,2,0.5)] hover:shadow-[0_0_50px_rgba(253,106,2,0.7)] transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 uppercase tracking-wider"
             >
               Ser Distribuidor Oficial
               <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
             </Link>

             {/* Micro-texto de confianza */}
             <p className="mt-8 text-xs text-gray-600 font-bold uppercase tracking-wider">
               Respuesta garantizada en menos de 24 hrs
             </p>

           </div>
        </div>
      </section>

      <footer className="bg-[#050505] border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-600 text-xs mb-4">
                © 2025 Fernando González Tolentino. Todos los derechos reservados.
              </p>
              <div className="flex justify-center gap-6">
                  <Link href="/" className="text-gray-500 hover:text-[#FD6A02] text-sm">Inicio</Link>
                  <Link href="/interest" className="text-gray-500 hover:text-[#FD6A02] text-sm">Contacto</Link>
              </div>
          </div>
      </footer>
      
    </div>
  );
}
