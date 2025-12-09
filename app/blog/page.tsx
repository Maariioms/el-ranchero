'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Flame, Clock, User, ArrowRight, ShoppingBag, Briefcase, BookOpen, ChevronRight, Search, Menu } from 'lucide-react';

export default function BlogPage() {
  
  const [activeCategory, setActiveCategory] = useState('todos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // DATOS MOCK DEL BLOG
  const posts = [
    {
      id: 1,
      title: "El secreto para un sellado perfecto en Ribeye",
      excerpt: "No es solo la carne, es la temperatura. Aprende a controlar el fuego intenso del Ébano para lograr esa costra dorada que todos buscan.",
      category: "Técnica",
      author: "Chef Carlos R.",
      readTime: "5 min",
      date: "05 Dic 2025",
      image: "/blog/ribeye.jpg", // Placeholder path
      featured: true, // Este sale en grande
      slug: "secreto-sellado-ribeye"
    }
  ];

  // Lógica simple de filtrado
  const filteredPosts = activeCategory === 'todos' 
    ? posts 
    : posts.filter(post => post.category === activeCategory || (activeCategory === 'featured' && post.featured));

  const featuredPost = posts.find(p => p.featured);
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost?.id); // No repetir el destacado en el grid si estamos en 'todos'

  return (
    // LIENZO MAESTRO (Mismo fondo oscuro infinito)
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#FD6A02] selection:text-white relative overflow-hidden">
      
      {/* LUCES DE FONDO */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#D32F2F]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

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
                <Link href="/historia" className="text-sm font-bold text-gray-300 hover:text-[#FD6A02] transition-colors uppercase tracking-wide flex items-center gap-1">
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
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          
          {/* HERO DEL BLOG */}
          <div className="text-center mb-16 relative">
             <span className="text-[#FD6A02] font-bold tracking-widest text-sm uppercase mb-4 block animate-fade-in">
                Blog & Recursos
             </span>
             <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
               Maestría del <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#D32F2F]">Fuego</span>
             </h1>
             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
               Técnicas, guías de negocio y secretos de la parrilla para llevar tu experiencia al siguiente nivel.
             </p>
          </div>

          {/* ARTÍCULO DESTACADO (Solo se muestra si el filtro es 'todos' o 'featured') */}
          {activeCategory === 'todos' && featuredPost && (
            <div className="mb-20 animate-fade-in-up">
               <Link href={`/blog/${featuredPost.slug}`} className="group relative block w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Imagen de fondo (Simulada con div gris si no hay img) */}
                  <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-700">
                     {/* <img src={featuredPost.image} ... className="object-cover w-full h-full" /> */}
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
                  </div>
                  
                  {/* Gradiente oscuro para leer texto */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>

                  {/* Contenido */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                     <span className="inline-block px-3 py-1 rounded-full bg-[#FD6A02] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-[#FD6A02]/30">
                        {featuredPost.category}
                     </span>
                     <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#FD6A02] transition-colors">
                        {featuredPost.title}
                     </h2>
                     <p className="text-gray-300 text-lg max-w-3xl mb-6 line-clamp-2 md:line-clamp-none">
                        {featuredPost.excerpt}
                     </p>
                     
                     <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
                        <div className="flex items-center gap-2">
                           <User className="w-4 h-4 text-[#FD6A02]" />
                           {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-[#FD6A02]" />
                           {featuredPost.readTime} Lectura
                        </div>
                        <div className="flex items-center gap-1 text-white group-hover:translate-x-2 transition-transform ml-auto md:ml-0">
                           Leer Artículo <ArrowRight className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
               </Link>
            </div>
          )}

          {/* BARRA DE CATEGORÍAS */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-t border-white/10 pb-6">
             <div className="flex flex-wrap gap-2">
                {['Todos', 'Técnica', 'Recetas', 'Negocio B2B', 'Guía de Producto'].map((cat) => (
                   <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all border capitalize ${
                         activeCategory === cat 
                         ? 'bg-white text-black border-white ' 
                         : 'bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-white/5 cursor-pointer'
                      }`}
                   >
                      {cat}
                   </button>
                ))}
             </div>
             
             {/* Barra de búsqueda (Visual por ahora) */}
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input 
                   type="text" 
                   placeholder="Buscar tema..." 
                   className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] w-64 transition-all"
                />
             </div>
          </div>

          {/* GRID DE ARTÍCULOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {gridPosts.map((post) => (
                <Link 
                   href={`/blog/${post.slug}`} 
                   key={post.id}
                   className="group flex flex-col bg-[#111]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#FD6A02]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                   {/* Imagen */}
                   <div className="h-48 bg-[#1a1a1a] relative overflow-hidden">
                      {/* Placeholder de imagen */}
                      <div className="absolute inset-0 bg-[#222] group-hover:scale-110 transition-transform duration-500"></div>
                      {/* Overlay para categoría */}
                      <div className="absolute top-4 left-4">
                         <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-wide">
                            {post.category}
                         </span>
                      </div>
                   </div>

                   {/* Contenido */}
                   <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-[#FD6A02] font-bold mb-3 uppercase tracking-wide">
                         <Flame className="w-3 h-3" />
                         {post.date}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#FD6A02] transition-colors">
                         {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                         {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                         <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                         </div>
                         <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Leer más <ChevronRight className="w-4 h-4 text-[#FD6A02]" />
                         </div>
                      </div>
                   </div>
                </Link>
             ))}
          </div>
        </main>
        
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
    
  );
}