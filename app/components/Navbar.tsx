import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, BookOpen, Flame, User, Briefcase, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Efecto para detectar scroll y aumentar la opacidad del fondo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función auxiliar para saber si el link está activo
  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-[#FD6A02]/20 shadow-lg shadow-black/50' 
          : 'bg-transparent backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">

          {/* 1. LOGO EL RANCHERO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(253,106,2,0.6)] transition-all bg-linear-to-br from-[#FD6A02]/20 to-transparent">
               {/* Asegúrate de que logo.png esté en la carpeta public */}
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

          {/* 2. MENÚ CENTRAL (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/productos" 
              className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors ${
                isActive('/productos') ? 'text-[#FD6A02]' : 'text-gray-300 hover:text-[#FD6A02]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              Productos
            </Link>
            <Link 
              href="/blog" 
              className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors ${
                isActive('/blog') ? 'text-[#FD6A02]' : 'text-gray-300 hover:text-[#FD6A02]'
              }`}
            >
              <BookOpen className="w-4 h-4 mb-0.5" />
              Nuestros Aliados
            </Link>
            <Link 
              href="/tradicion" 
              className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors ${
                isActive('/tradicion') ? 'text-[#FD6A02]' : 'text-gray-300 hover:text-[#FD6A02]'
              }`}
            >
              <Flame className="w-4 h-4 mb-0.5" />
              Tradición
            </Link>
          </nav>

          {/* 3. ACCIONES DERECHA (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Separador */}
            <div className="h-8 w-px bg-white/10"></div>

            {/* Login */}
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

            {/* CTA Distribuidor */}
            <Link
              href="/interest"
              className="bg-[#FD6A02] hover:bg-[#e55a00] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(253,106,2,0.3)] hover:shadow-[0_0_25px_rgba(253,106,2,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 tracking-wide"
            >
              <Briefcase className="w-4 h-4" />
              Quiero ser Distribuidor / Socio
            </Link>
          </div>

          {/* Botón Hamburguesa (Mobile) */}
          <button 
            className="md:hidden text-white hover:text-[#FD6A02] transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 animate-fade-in-down absolute w-full left-0 shadow-2xl h-screen">
          <div className="px-4 py-6 space-y-2">
            
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Explora</p>
            
            <Link 
              href="/productos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-[#FD6A02] transition-colors"
            >
              Nuestros Productos
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-[#FD6A02] transition-colors"
            >
              Nuestros Aliados
            </Link>
            <Link 
              href="/tradicion" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-[#FD6A02] transition-colors"
            >
              Nuestra Historia
            </Link>

            <div className="h-px bg-white/10 my-6 mx-2"></div>

            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Socios</p>

            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#FD6A02]/10 flex items-center justify-center text-[#FD6A02]">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold">Ingresar al Sistema</span>
                <span className="text-xs text-gray-500">Pedidos y facturas</span>
              </div>
            </Link>

            <Link 
              href="/contacto-distribuidor" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#FD6A02] text-white py-4 rounded-lg font-bold mt-6 shadow-lg shadow-[#FD6A02]/20 active:scale-95 transition-transform uppercase tracking-wide"
            >
              <Briefcase className="w-4 h-4" />
              Solicitar Alta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}