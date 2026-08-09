"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Flame, MapPin, ArrowRight, Star, Clock, Hammer, Award } from "lucide-react";

export default function HistoriaPage() {
  const milestones = [
    {
      year: "1923",
      title: "La Primera Chispa",
      description:
        "En los montes de Tamaulipas empieza el oficio con maderas de corriente tropical como el ébano y el mezquite: tronco por tronco, fuego lento y respeto por la madera.",
      image: "/carbon-tirado.jpg",
      tag: "Origen",
      icon: Flame,
    },
    {
      year: "1960",
      title: "El Fuego Viaja",
      description:
        "El mezquite cruza el país. El humo norteño llega al centro y encuentra nuevas mesas alrededor del fuego.",
      image: "/torre.jpg",
      tag: "Expansión",
      icon: MapPin,
    },
    {
      year: "1995",
      title: "Fuerza y Oficio",
      description:
        "La producción crece, el método no cambia. Escala industrial con alma artesanal.",
      image: "/carbon-prendidp.jpg",
      tag: "Escala",
      icon: Hammer,
    },
    {
      year: "2025",
      title: "La Tercera Generación",
      description:
        "Un siglo después, la tercera generación de la familia sigue el oficio y encuentra nuevas rutas sin perder su origen.",
      image: "/bolsas.jpg",
      tag: "Hoy",
      icon: Award,
    },
  ];

  // Scroll reveal, mismo patrón que el resto del sitio (app/page.tsx)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-reveal, .scroll-reveal-fast");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white overflow-hidden">
      {/* Textura sutil */}
      <div
        className="fixed inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url(https://www.transparenttextures.com/patterns/asfalt-light.png)",
        }}
      />

      <Navbar />

      {/* HERO — asimétrico, con imagen real de fondo en vez de vacío centrado */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: "url('/fondo-carbon.jpg')" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-bg via-bg/85 to-bg" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center lg:text-left">
            <span className="inline-block mb-6 text-xs tracking-[0.3em] text-accent uppercase font-bold">
              Desde 1923 — Tamaulipas
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9]">
              Un Siglo
              <br />
              <span className="text-accent">Encendiendo</span>
              <br />
              Momentos
            </h1>
            <p className="mt-8 max-w-xl mx-auto lg:mx-0 text-gray-400 text-lg">
              El fuego no se inventa. Se hereda, se cuida y se comparte alrededor de la mesa.
            </p>
            <p className="mt-3 max-w-xl mx-auto lg:mx-0 text-gold text-sm uppercase tracking-widest font-bold">
              Tamaulipas — segundo lugar nacional en producción de carbón
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-surface/30 grid grid-cols-3 scroll-reveal-fast">
        {[
          { num: "3", label: "Generaciones", icon: <Clock className="w-5 h-5" /> },
          { num: "4", label: "Estados", icon: <MapPin className="w-5 h-5" /> },
          { num: "100%", label: "Mexicana", icon: <Star className="w-5 h-5" /> },
        ].map((s, i) => (
          <div
            key={i}
            className="py-12 md:py-16 text-center border-l border-white/5 first:border-l-0 hover:bg-white/3 transition-colors duration-300"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
              {s.icon}
            </div>
            <div className="text-4xl md:text-5xl font-black">{s.num}</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mt-1.5">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ORIGEN — bloque intermedio con contenido real, llena el hueco entre stats y timeline */}
      <section className="py-28 relative scroll-reveal">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 lg:h-[460px] rounded-2xl overflow-hidden border border-white/10 order-2 lg:order-1">
            <img
              src="/carne-asada.jpg"
              alt="Carne asada sobre brasas de El Ranchero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-accent font-black tracking-widest text-xs uppercase mb-4 block">
              El oficio
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
              Ébano y mezquite,
              <br />
              <span className="text-gold">de la misma tierra</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              No elegimos estas maderas por moda: son las especies de corriente tropical
              que da la región de Tamaulipas. El ébano arde con brasa intensa y duradera; el
              mezquite entrega el humo que distingue a la carne asada del norte.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Un siglo después seguimos usando las mismas dos maderas, cortadas y horneadas con el
              mismo criterio: tronco por tronco, sin atajos.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-32 relative scroll-reveal">
        {/* Línea central */}
        <div className="absolute left-1/2 top-40 bottom-20 w-px bg-linear-to-b from-transparent via-accent/40 to-transparent hidden md:block" />

        <h2 className="text-center text-xs tracking-[0.5em] uppercase text-gray-500 mb-24">
          Nuestra Trayectoria
        </h2>

        <div className="max-w-6xl mx-auto space-y-32 px-6">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className={`relative grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  i % 2 !== 0 ? "md:text-left" : "md:text-right"
                }`}
              >
                {/* Nodo */}
                <div className="absolute left-1/2 -top-6 w-4 h-4 rounded-full bg-bg border-2 border-accent hidden md:block -translate-x-1/2 shadow-[0_0_20px_rgba(253,106,2,0.6)]" />

                {/* Imagen real del producto/oficio */}
                <div
                  className={`group relative h-72 md:h-[380px] rounded-2xl overflow-hidden border border-white/10 ${
                    i % 2 !== 0 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/10" />
                  <span
                    className={`absolute top-5 ${
                      i % 2 !== 0 ? "left-5" : "right-5"
                    } inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gold`}
                  >
                    <Icon className="w-3 h-3" />
                    {m.tag}
                  </span>
                </div>

                {/* Texto */}
                <div className="relative z-10">
                  <div className="text-6xl font-black text-accent mb-4 tracking-tight">
                    {m.year}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{m.title}</h3>
                  <p className="text-gray-400 max-w-md mx-auto md:mx-0 text-lg leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MANIFIESTO — ahora con imagen real de fondo en vez de fondo plano */}
      <section className="relative py-36 overflow-hidden scroll-reveal">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/torre.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-bg via-black/75 to-bg" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Flame className="w-14 h-14 mx-auto mb-10 text-accent animate-[pulse_4s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(253,106,2,0.7)]" />
          <h2 className="text-4xl md:text-7xl font-black uppercase leading-tight max-w-5xl mx-auto">
            No vendemos carbón.
            <br />
            Vendemos la <span className="text-accent">excusa</span> para reunirnos.
          </h2>
          <p className="mt-10 text-xl text-gray-300 max-w-3xl mx-auto">
            Cocinar lento, con humo real y gente alrededor del fuego. Esa es nuestra promesa.
          </p>
        </div>
      </section>

      {/* CTA FINAL — directo sobre el fondo, mismo patrón que el resto de la página */}
      <section className="relative py-32 px-6 overflow-hidden scroll-reveal">
        {/* Marca de agua, igual criterio que el resto del sitio: contenida, mezclada con el fondo */}
        <img
          src="/logo-solo-letras-negras.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-48 h-48 md:w-64 md:h-64 object-contain object-bottom opacity-[0.08] rotate-6 pointer-events-none select-none"
          style={{ filter: "invert(1)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-8">
            <Star className="w-3 h-3 fill-current" />
            Legado & Negocio
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
            Escribe el <br className="hidden md:block" />
            Siguiente Capítulo
          </h2>

          <p className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Lleva esta tradición a tus clientes y forma parte de un legado que sigue{" "}
            <span className="text-white font-medium">encendiendo mesas</span> en todo el país.
          </p>

          <Link
            href="/interest"
            className="btn-press cursor-pointer group bg-accent hover:bg-accent-hover px-8 py-4 md:px-12 md:py-6 font-black text-base md:text-2xl text-white transition-colors rounded-full inline-flex items-center justify-center text-center gap-3 uppercase tracking-wider"
          >
            Ser Distribuidor Oficial
            <ArrowRight className="w-5 h-5 md:w-7 md:h-7 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-8 text-xs text-gray-600 font-bold uppercase tracking-wider">
            Respuesta garantizada en menos de 24 hrs
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
