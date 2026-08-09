import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Flame, Briefcase, Menu, X, ChevronDown, Package, Zap, Sparkles, LayoutGrid } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { tipo: '', label: 'Ver Todo', icon: LayoutGrid },
  { tipo: 'iniciador', label: 'Iniciadores', icon: Sparkles },
  { tipo: 'briqueta', label: 'Briquetas', icon: Zap },
  { tipo: 'carbon', label: 'Carbón', icon: Package },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const productsRef = useRef<HTMLDivElement>(null);

  // Efecto para detectar scroll y aumentar la opacidad del fondo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra el desplegable de Productos al hacer click fuera o presionar Escape
  useEffect(() => {
    if (!isProductsOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProductsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProductsOpen]);

  // Función auxiliar para saber si el link está activo
  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled 
          ? 'bg-bg/95 backdrop-blur-md border-accent/20 shadow-lg shadow-black/50'
          : 'bg-transparent backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">

          {/* 1. LOGO EL RANCHERO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(253,106,2,0.6)] transition-all bg-linear-to-br from-accent/20 to-transparent">
               <img
                 src="/logo-original-circulo-rojo.png"
                 alt="Logo El Ranchero"
                 className="w-8 h-8 object-contain"
               />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-none group-hover:text-accent transition-colors">
                El Ranchero
              </span>
              <span className="text-[10px] text-accent font-bold tracking-[0.2em] uppercase">
                Carbón vegetal
              </span>
            </div>
          </Link>

          {/* 2. MENÚ CENTRAL (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Productos con desplegable por categoría */}
            <div
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsProductsOpen((v) => !v)}
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
                className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors cursor-pointer ${
                  isActive('/productos') ? 'text-accent' : 'text-gray-300 hover:text-accent'
                }`}
              >
                <ShoppingBag className="w-4 h-4 mb-0.5" />
                Productos
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-180 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductsOpen && (
                <div className="modal-in absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64">
                  <div className="grid grid-cols-2 gap-1 p-2 rounded-xl bg-surface border border-white/10 shadow-2xl shadow-black/50">
                    {PRODUCT_CATEGORIES.map(({ tipo, label, icon: Icon }) => (
                      <Link
                        key={label}
                        href={tipo ? `/productos?tipo=${tipo}` : '/productos'}
                        onClick={() => setIsProductsOpen(false)}
                        className="flex flex-col items-center gap-1.5 rounded-lg px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-gray-300 hover:bg-white/5 hover:text-accent transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tradicion"
              className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors ${
                isActive('/tradicion') ? 'text-accent' : 'text-gray-300 hover:text-accent'
              }`}
            >
              <Flame className="w-4 h-4 mb-0.5" />
              Tradición
            </Link>
          </nav>

          {/* 3. ACCIONES DERECHA (Desktop) */}
          <div className="hidden md:flex items-center gap-6">

            {/* CTA Distribuidor */}
            <Link
              href="/interest"
              className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(253,106,2,0.3)] hover:shadow-[0_0_25px_rgba(253,106,2,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 tracking-wide"
            >
              <Briefcase className="w-4 h-4" />
              Quiero ser Distribuidor / Socio
            </Link>
          </div>

          {/* Botón Hamburguesa (Mobile) */}
          <button 
            className="md:hidden text-white hover:text-accent transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bg border-t border-white/10 animate-fade-in-down absolute w-full left-0 shadow-2xl h-screen">
          <div className="px-4 py-6 space-y-2">
            
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Explora</p>
            
            <Link
              href="/productos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-accent transition-colors"
            >
              Nuestros Productos
            </Link>
            <div className="grid grid-cols-3 gap-2 px-3 pb-2">
              {PRODUCT_CATEGORIES.filter((c) => c.tipo).map(({ tipo, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={`/productos?tipo=${tipo}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-1 rounded-lg bg-white/5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-300 hover:bg-white/10 hover:text-accent transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>
            <Link
              href="/tradicion"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-lg font-bold text-white hover:bg-white/5 hover:text-accent transition-colors"
            >
              Nuestra Historia
            </Link>

            <div className="h-px bg-white/10 my-6 mx-2"></div>

            <Link
              href="/interest" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-accent text-white py-4 rounded-lg font-bold mt-6 shadow-lg shadow-accent/20 active:scale-95 transition-transform uppercase tracking-wide"
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