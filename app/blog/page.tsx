'use client'

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Flame, MapPin, ArrowRight, ChefHat, Star, UtensilsCrossed, Instagram, ExternalLink, Briefcase } from 'lucide-react';

export default function AliadosPage() {
  
  const [activeFilter, setActiveFilter] = useState('todos');

  // DATOS MOCK DE TUS CLIENTES / ALIADOS
  const aliados = [
    {
      id: 1,
      name: "Sonora Grill Prime",
      location: "Polanco, CDMX",
      description: "El templo del corte fino. Usan nuestro Costal Jumbo de Mezquite para mantener las parrillas encendidas más de 12 horas continuas.",
      type: "Steakhouse",
      chef: "Chef Aurelio",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", // Foto del platillo
      logo: "/aliados/logo-sonora.png",   // Logo del restaurante
      featured: true, // El cliente VIP sale en grande
      instagram: "@sonoragrill"
    },
    {
      id: 2,
      name: "Los Carbones de Don Chuy",
      location: "Monterrey, NL",
      description: "Tradición regia. Aquí el cabrito se hace lento y con humo aromático de Ébano.",
      type: "Tradicional",
      image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=2070&auto=format&fit=crop",
      featured: false
    },
    {
      id: 3,
      name: "Bochornos Burger",
      location: "Guadalajara, JAL",
      description: "Las mejores hamburguesas al carbón de la zona. Usan nuestra Briqueta para calor uniforme.",
      type: "Smash Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",
      featured: false
    },
    {
      id: 4,
      name: "Mariscos El Güero",
      location: "Mazatlán, SIN",
      description: "Pescado zarandeado a la leña. El sabor ahumado suave de nuestro Mezquite es su secreto.",
      type: "Mariscos",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
      featured: false
    },
    {
      id: 5,
      name: "Ahumados del Valle",
      location: "Valle de Bravo",
      description: "Expertos en Brisket y Costillas BBQ. Consumen nuestro costal Extra-Grande por toneladas.",
      type: "Smokehouse",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6e9473f56?q=80&w=2070&auto=format&fit=crop",
      featured: false
    }
  ];

  // Lógica de filtrado
  const filteredAliados = activeFilter === 'todos' 
    ? aliados 
    : aliados.filter(a => a.type === activeFilter || (activeFilter === 'featured' && a.featured));

  const featuredAlly = aliados.find(a => a.featured);
  const gridAliados = filteredAliados.filter(a => a.id !== featuredAlly?.id); 

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#FD6A02] selection:text-white relative overflow-hidden">
      
      {/* LUCES DE FONDO (Ambiente) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="relative z-10">

        <Navbar />

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 pt-25">
          
          {/* HERO SECTION */}
          <div className="text-center mb-16 relative animate-fade-in">
             <span className="text-[#FD6A02] font-bold tracking-widest text-sm uppercase mb-4 block">
                Comunidad El Ranchero
             </span>
             <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
               Donde Arde <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#D32F2F]">Nuestro Fuego</span>
             </h1>
             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
               Los mejores parrilleros y restaurantes confían en nuestra calidad. 
               Visítalos y prueba la diferencia de un buen carbón.
             </p>
          </div>

          {/* ALIADO DESTACADO (El "Hero" Client) */}
          {activeFilter === 'todos' && featuredAlly && (
            <div className="mb-20 animate-fade-in-up">
               {/* MODIFICACIÓN AQUÍ: Se agregaron clases de hover y transition */}
               <div className="group relative block w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:border-[#FD6A02]/50 hover:shadow-[0_0_60px_rgba(253,106,2,0.25)] hover:-translate-y-1 cursor-pointer">
                  
                  {/* Imagen de fondo (El platillo estrella) */}
                  <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-700">
                     <img 
                        src={featuredAlly.image} 
                        alt={`Platillo estrella de ${featuredAlly.name}`}
                        className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  
                  {/* Gradiente */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>

                  {/* Contenido */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                     <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#FD6A02] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FD6A02]/30">
                           Aliado del Mes
                        </span>
                        <div className="flex text-[#FFD700]">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                     </div>

                     <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none uppercase italic group-hover:text-[#FD6A02] transition-colors">
                        {featuredAlly.name}
                     </h2>
                     
                     <p className="text-gray-300 text-lg max-w-2xl mb-8 font-medium">
                        "{featuredAlly.description}"
                     </p>
                     
                     <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-bold uppercase tracking-wide">
                        <div className="flex items-center gap-2 text-white">
                           <ChefHat className="w-5 h-5 text-[#FD6A02]" />
                           {featuredAlly.chef}
                        </div>
                        <div className="flex items-center gap-2">
                           <MapPin className="w-5 h-5 text-[#FD6A02]" />
                           {featuredAlly.location}
                        </div>
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(featuredAlly.name + ' ' + featuredAlly.location)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#FD6A02] hover:text-white transition-colors ml-auto md:ml-0 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 border border-white/5">
                           <ExternalLink className="w-4 h-4 mr-1" />
                           Cómo Llegar
                        </a>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* FILTROS (Tipos de Comida) */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {['todos', 'Steakhouse', 'Mariscos', 'Tradicional', 'Smokehouse'].map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all border capitalize cursor-pointer ${
                        activeFilter === cat 
                        ? 'bg-[#FD6A02] text-white border-[#FD6A02] shadow-lg shadow-[#FD6A02]/20' 
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                >
                    {cat === 'todos' ? 'Ver Todos' : cat}
                </button>
            ))}
          </div>

          {/* GRID DE RESTAURANTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
             {gridAliados.map((aliado) => (
                <div 
                   key={aliado.id}
                   className="group flex flex-col bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD6A02]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(253,106,2,0.15)]"
                >
                   {/* Imagen Platillo */}
                   <div className="h-56 bg-[#1a1a1a] relative overflow-hidden">
                      <img src={aliado.image} alt={`Platillo de ${aliado.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.2),rgba(0,0,0,0.8))]" />
                      
                      {/* Tag Flotante */}
                      <div className="absolute top-4 right-4">
                         <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#FD6A02] border border-[#FD6A02]/20 uppercase tracking-wide flex items-center gap-1">
                            <UtensilsCrossed className="w-3 h-3" />
                            {aliado.type}
                         </span>
                      </div>
                   </div>

                   {/* Info Restaurante */}
                   <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight group-hover:text-[#FD6A02] transition-colors">
                         {aliado.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 font-medium">
                         <MapPin className="w-3.5 h-3.5 text-[#FD6A02]" />
                         {aliado.location}
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-[#FD6A02]/50 pl-3 italic">
                         "{aliado.description}"
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <span className="text-xs text-gray-600 font-bold uppercase">
                            Cliente Frecuente
                         </span>
                         <button className="text-xs font-bold text-white hover:text-[#FD6A02] flex items-center gap-1 transition-colors cursor-pointer">
                            Visitar Sitio <ArrowRight className="w-3 h-3" />
                         </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* CTA: UNIRSE A LA FAMILIA */}
          <div className="relative rounded-3xl overflow-hidden border border-[#FD6A02]/30 bg-[#FD6A02]/5 p-8 md:p-12 text-center mb-12">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Flame className="w-64 h-64 text-[#FD6A02]" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase relative z-10">
                    ¿Tu parrilla necesita <span className="text-[#FD6A02]">poder real</span>?
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 relative z-10">
                    Únete a la familia de restaurantes que sirven calidad. Precios especiales por volumen y entrega garantizada.
                </p>
                <Link 
                    href="/contacto-distribuidor"
                    className="relative z-10 inline-flex items-center gap-2 bg-[#FD6A02] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e55a00] hover:scale-105 transition-all shadow-lg shadow-[#FD6A02]/20 uppercase tracking-wide"
                >
                    <Briefcase className="w-5 h-5" />
                    Cotizar para mi Negocio
                </Link>
          </div>

        </main>
      </div>

      {/* FOOTER */}
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
  );
}