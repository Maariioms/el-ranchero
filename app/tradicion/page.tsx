'use client'

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Flame, ShoppingBag, User, Users, MapPin, Award, ArrowRight, Anchor, Target, Heart, BookOpen, Briefcase, Menu, X } from 'lucide-react';

export default function HistoriaPage() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATOS DE LA LÍNEA DE TIEMPO
  const milestones = [
    {
      year: "1923",
      title: "La Primera Chispita",
      description: "En los montes de Tamaulipas, Don Salvador inicia la producción artesanal de carbón vegetal, transportándolo en carreta a las comunidades vecinas.",
      icon: <Flame className="w-6 h-6" />
    },
    {
      year: "1960",
      title: "Llegada al Centro",
      description: "La calidad del mezquite norteño viaja hacia el centro del país. Nos establecemos en Naucalpan, convirtiéndonos en el secreto de los mejores asadores de la capital.",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      year: "1995",
      title: "Consolidación Industrial",
      description: "Sin perder el toque artesanal, modernizamos nuestra logística para abastecer a las primeras grandes cadenas de autoservicio.",
      icon: <Anchor className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "La Nueva Era",
      description: "Lanzamos nuestra plataforma digital B2B, llevando la tradición de un siglo a la velocidad del comercio electrónico moderno.",
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#FD6A02] selection:text-white relative overflow-hidden">
      
      {/* LUCES DE FONDO (Sepia/Naranja para dar toque antiguo/calido) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-[#D32F2F]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">

        {/* --- HEADER COMPLETO --- */}
        <Navbar />

        <main>
            
            {/* HERO: LEGADO */}
            <section className="relative py-24 px-4 md:px-6 text-center overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <span className="text-[#FD6A02] font-bold tracking-[0.3em] text-sm uppercase mb-4 block animate-fade-in">
                        Nuestra Historia
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 uppercase leading-none tracking-tight">
                        100 Años de <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#D32F2F]">
                            Pura Tradición
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        No somos una fábrica, somos una familia que ha dedicado cuatro generaciones a dominar el arte del fuego. Desde 1923, llevamos el alma del monte a tu parrilla.
                    </p>
                </div>
            </section>

            {/* SECCIÓN: EL PROCESO (HARD FIX) */}
            <section className="py-16 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Forzamos altura con style para asegurar que no colapse */}
                    <div 
                        className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
                        style={{ height: '500px' }} 
                    >
                        
                        {/* IMAGEN DE FONDO (Aplicada directo al div para asegurar visualización) */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: "url('https://efecto-mandela-la.fandom.com/es/wiki/Cola_de_Jorge_el_Curioso')" }}
                        ></div>
                        
                        {/* CAPA OSCURA (Para que se lea el texto) */}
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>

                        {/* CONTENIDO (Z-Index alto para estar encima de todo) */}
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                <Flame className="w-5 h-5 text-[#FD6A02]" />
                                <span className="text-[#FD6A02] font-bold tracking-widest text-xs uppercase">
                                    Nuestro Secreto
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase leading-tight">
                                El Arte del Horno
                            </h3>
                            <p className="text-white text-lg leading-relaxed">
                                A diferencia del carbón industrial, nuestro proceso de carbonización toma <strong>15 días</strong>. 
                                Es lento y difícil, pero es la única forma de conseguir trozos de Ébano que suenen como cristal al chocar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE VERTICAL */}
            {/* TIMELINE (SISTEMA GRID - INDESTRUCTIBLE) */}
            <section className="py-24 relative border border-white/10">
                <div className="max-w-5xl mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-black text-center text-white mb-12 uppercase">
                        Nuestra Trayectoria
                    </h2>

                    <div className="relative">
                        {/* LÍNEA CENTRAL (Fija al centro con absolute) */}
                        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#FD6A02] via-white/10 to-transparent md:-translate-x-1/2"></div>

                        <div className="space-y-16">
                            {milestones.map((milestone, index) => (
                                // GRID: En móvil es flex normal, en desktop es un grid de 2 columnas
                                <div key={index} className={`relative flex flex-col md:flex-row items-center md:justify-between gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* 1. EL CONTENIDO (LA TARJETA) - Ocupa la mitad menos un hueco */}
                                    <div className="w-full md:w-[45%] pl-12 md:pl-0">
                                        <div className="group bg-[#111]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-[#FD6A02]/50 transition-all hover:shadow-lg relative overflow-hidden">

                                            {/* Header Tarjeta */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="inline-flex p-3 rounded-lg bg-[#FD6A02]/10 text-[#FD6A02]">
                                                    {milestone.icon}
                                                </div>
                                                <span className="text-3xl font-black text-white/10 group-hover:text-[#FD6A02] transition-colors duration-500">
                                                    {milestone.year}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. EL PUNTO CENTRAL (BOLITA) */}
                                    {/* En móvil se pega a la izquierda (left-5), en desktop se centra exacto */}
                                    <div className="absolute left-3 md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-[#FD6A02] shadow-[0_0_15px_rgba(253,106,2,1)] md:-translate-x-1/2 md:-translate-y-1/2 outline outline-4 outline-[#0A0A0A] z-20"></div>

                                    {/* 3. EL ESPACIO VACÍO (Para equilibrar el grid) */}
                                    <div className="hidden md:block md:w-[45%]"></div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VALORES (GRID) */}
            <section className="py-20 bg-[#0F0F0F]/50 border-t border-white/10 ">
                <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#FD6A02]/10 flex items-center justify-center text-[#FD6A02] mb-6">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Calidad Intransigente</h3>
                            <p className="text-gray-500 text-sm">
                                Si el costal no cumple con el peso o el tamaño del trozo, no sale de la bodega. Así de simple.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#FD6A02]/10 flex items-center justify-center text-[#FD6A02] mb-6">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Trato de Familia</h3>
                            <p className="text-gray-500 text-sm">
                                Nuestros clientes no son números de cuenta. Son socios con nombre y apellido.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#FD6A02]/10 flex items-center justify-center text-[#FD6A02] mb-6">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Pasión por el Fuego</h3>
                            <p className="text-gray-500 text-sm">
                                Amamos lo que hacemos. Entendemos que el carbón es el ingrediente secreto de cada reunión.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL: UNETE A LA HISTORIA */}
            <div className="py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-[#FD6A02]/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">
                        Sé parte de nuestra historia
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Únete a la red de distribuidores que confían en la tradición de El Ranchero para hacer crecer su negocio.
                    </p>
                    <Link 
                        href="/contacto-distribuidor"
                        className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full text-white bg-[#FD6A02] hover:bg-[#e55a00] shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] transition-all transform hover:-translate-y-1 gap-2 uppercase tracking-wide"
                    >
                        Solicitar Alianza
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

        </main>

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