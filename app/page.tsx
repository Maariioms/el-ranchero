'use client'

import { useState, useEffect, useRef } from 'react';
import Modal from './components/Modal';
import Link from 'next/link';
import { TriangleAlert, ArrowRight, ShoppingBag, User, Menu, Briefcase, DollarSign,  ShieldCheck, TreeDeciduous, X, Zap, Instagram, Facebook, Twitter, ShieldAlert, GraduationCap, Award, Leaf, CheckCircle2, Flame, Hammer, Star, MapPin, Thermometer, Clock, BookOpen, AlertTriangle, Phone, ShoppingCart, ChefHat } from 'lucide-react';


interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  colorClass: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, colorClass, description }: FeatureCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className={`w-8 h-8 ${colorClass}`} />
          </div>
        </div>
        <h3 className={`text-xl font-bold mb-3 ${colorClass}`}>{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  // Actualicé los nombres para que tengan sentido con el Carbón. 
  // Si tu base de datos manda 'blue', avísame para mapearlo.
  colorTheme: 'orange' | 'red' | 'gold' | 'gray'; 
  showArrow: boolean;
}

function StepCard({ number, title, description, colorTheme, showArrow }: StepCardProps) {
  
  // MAPA DE COLORES "EL RANCHERO"
  const colorStyles = {
    orange: { // El color principal (Fuego/Encendido)
      bgCircle: 'bg-[#FD6A02]',
      shadow: 'shadow-[0_0_20px_rgba(253,106,2,0.4)]',
      bgCard: 'bg-gradient-to-b from-[#FD6A02]/10 to-transparent',
      border: 'border-[#FD6A02]/30',
      hoverBorder: 'group-hover:border-[#FD6A02]',
      text: 'text-[#FD6A02]',
    },
    red: { // Calor intenso (Brasa)
      bgCircle: 'bg-[#D32F2F]',
      shadow: 'shadow-[0_0_20px_rgba(211,47,47,0.4)]',
      bgCard: 'bg-gradient-to-b from-[#D32F2F]/10 to-transparent',
      border: 'border-[#D32F2F]/30',
      hoverBorder: 'group-hover:border-[#D32F2F]',
      text: 'text-[#D32F2F]',
    },
    gold: { // Calidad Premium
      bgCircle: 'bg-[#FFD700]',
      shadow: 'shadow-[0_0_20px_rgba(255,215,0,0.4)]',
      bgCard: 'bg-gradient-to-b from-[#FFD700]/10 to-transparent',
      border: 'border-[#FFD700]/30',
      hoverBorder: 'group-hover:border-[#FFD700]',
      text: 'text-[#FFD700]',
    },
    gray: { // Ceniza / Humo / Neutro
      bgCircle: 'bg-white',
      shadow: 'shadow-[0_0_20px_rgba(255,255,255,0.3)]',
      bgCard: 'bg-gradient-to-b from-white/5 to-transparent',
      border: 'border-white/20',
      hoverBorder: 'group-hover:border-white',
      text: 'text-white',
    }
  };

  const colors = colorStyles[colorTheme];

  return (
    <div className="text-center relative flex flex-col group h-full">
      {/* Círculo del número: Ahora brilla como una brasa */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 z-10 ${colors.bgCircle} ${colors.shadow}`}>
        {/* El número dentro es negro o gris oscuro para contraste contra el color brillante */}
        <span className="text-2xl font-black text-[#0A0A0A]">{number}</span>
      </div>

      {/* Tarjeta de contenido: Glassmorphism oscuro con borde de color */}
      <div className={`flex-1 p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${colors.bgCard} ${colors.border} ${colors.hoverBorder}`}>
        <h3 className={`text-xl font-bold mb-3 uppercase tracking-wide ${colors.text}`}>{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Flecha conectora */}
      {showArrow && (
        <div className="hidden lg:block absolute top-8 -right-4 text-white/20 text-3xl transform translate-x-1/2">
          →
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {

  const [isLoading, setIsLoading] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showDisclaimerBanner, setShowDisclaimerBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll reveal effect - Ferrari/Lamborghini style
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-fast');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isLoading]);

  const stepsData = [
    {
      number: "01",
      title: "Solicita",
      description: "Llena el formulario de alta. Un asesor evaluará tus necesidades de volumen y frecuencia.",
      colorTheme: "orange",
      showArrow: true
    },
    {
      number: "02",
      title: "Cotiza",
      description: "Recibe una propuesta comercial personalizada con precios preferenciales de mayoreo.",
      colorTheme: "red",
      showArrow: true
    },
    {
      number: "03",
      title: "Recibe",
      description: "Logística eficiente. Entregamos en tu bodega o sucursal con garantía de producto intacto.",
      colorTheme: "gold",
      showArrow: true
    },
    {
      number: "04",
      title: "Gestiona",
      description: "Accede a tu Dashboard exclusivo para resurtir pedidos, descargar facturas y ver métricas.",
      colorTheme: "gray",
      showArrow: false
    }
  ];

  const featuresData = [
  {
    title: "Perfil de Sabor Único",
    description: "El mezquite aporta notas ahumadas auténticas que elevan tus cortes",
    icon: ChefHat,
    colorClass: "text-[#FD6A02]", // Naranja
    borderColor: "group-hover:border-[#FD6A02]"
  },
  {
    title: "Rentabilidad por Costal",
    description: "Rinde hasta 30% más que carbones comerciales",
    icon: DollarSign,
    colorClass: "text-[#FFD700]", // Oro (Dinero/Ahorro)
    borderColor: "group-hover:border-[#FFD700]"
  },
  {
    title: "Temperatura Constante",
    description: "Brasa estable para control total de cocción",
    icon: Flame,
    colorClass: "text-[#D32F2F]", // Rojo
    borderColor: "group-hover:border-[#D32F2F]"
  },
  {
    title: "Seguridad Operativa",
    description: "Minimiza chispas, protegiendo personal y comensales",
    icon: ShieldCheck,
    colorClass: "text-white", // Blanco
    borderColor: "group-hover:border-white"
  }
];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#FD6A02] selection:text-[#0A0A0A] font-sans">

      {/* --- HEADER --- */}
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

              <div className="h-[1px] bg-white/10 my-4 mx-2"></div>

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

      <main>
        {/* Disclaimer Banner - Modern Design */}

        {showDisclaimerBanner && (
          <div className="relative mt-6 md:mt-10 mb-6 md:mb-10 animate-fade-in-down">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

              <div className="relative bg-linear-to-r from-yellow-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-yellow-500/40 rounded-2xl p-4 md:p-6 shadow-[0_0_30px_rgba(234,179,8,0.1)]">

                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(234,179,8,0.05)_0px,rgba(234,179,8,0.05)_10px,transparent_10px,transparent_20px)] rounded-2xl pointer-events-none"></div>

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 md:gap-5 flex-1">

                    <div className="shrink-0 w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center ring-2 ring-yellow-500/40 animate-pulse-slow">
                      <TriangleAlert className="w-6 h-6 text-yellow-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-[#FD6A02]" />
                        <h4 className="font-extrabold text-yellow-400 text-sm md:text-base uppercase tracking-wide">
                          ¡PELIGRO! MONÓXIDO DE CARBONO
                        </h4>
                      </div>

                      <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                        Quemar carbón en espacios cerrados puede ser <strong className="text-white">fatal</strong>. 
                        Su combustión emite monóxido de carbono, el cual no tiene olor. 
                        <span className="block mt-1 text-yellow-200/90 font-medium">
                          NUNCA queme carbón dentro de casas, vehículos o tiendas de campaña.
                        </span>
                      </p>

                      <div className="flex flex-wrap gap-4 items-center">
                        <button
                          onClick={() => setShowDisclaimerModal(true)} 
                          className="cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm text-[#FD6A02] hover:text-white transition-colors font-bold uppercase tracking-wider group"
                        >
                          <span>Ver Guía de Uso Seguro</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <span className="text-gray-700 hidden sm:inline">|</span>

                        <button
                          onClick={() => setShowContactModal(true)}
                          className="cursor-pointer text-xs md:text-sm text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          Teléfonos de contacto
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowDisclaimerBanner(false)}
                    className="shrink-0 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:rotate-90"
                    aria-label="Cerrar advertencia"
                  >
                    <X className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}

        <section className="relative min-h-[700px] flex items-center overflow-hidden">
          {/* Imagen de fondo: Carbón real ardiendo */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/fondo-carbon.jpg')`,
              }}
            />
            {/* Overlay oscuro con textura */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/60" />
            <div className="absolute inset-0 bg-charcoal-texture" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-6 inline-block">
                <span className="rounded-full bg-[#FD6A02]/20 px-4 py-2 text-sm font-bold text-[#FD6A02] ring-1 ring-inset ring-[#FD6A02]/30 uppercase tracking-widest backdrop-blur-sm">
                   La mejor elección de los parrilleros expertos
                </span>
              </div>

              {/* Título principal */}
              <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-none">
                Carbón que
                <br />
                <span className="text-[#FD6A02] italic">sabe a tradición</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
                100% Mezquite y Ébano. Hecho a mano en <span className="text-[#FFD700] font-bold">Tamaulipas</span>, 
                donde la carne asada es religión.
              </p>

              {/* Stats rápidos */}
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <div className="text-3xl font-black text-[#FD6A02] mb-1">100%</div>
                  <div className="text-gray-400 uppercase text-xs tracking-wider">Natural</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#FFD700] mb-1">3hrs+</div>
                  <div className="text-gray-400 uppercase text-xs tracking-wider">Duración</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">0</div>
                  <div className="text-gray-400 uppercase text-xs tracking-wider">Químicos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen del producto flotante (derecha en desktop) */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px]">
            <div 
              className="w-full h-full bg-cover bg-center transform rotate-12 hover:rotate-6 transition-transform duration-700"
              style={{
                backgroundImage: "url('/ranchero-fondo.jpg')",
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))'
              }}
            />
          </div>
        </section>
        
        <section className="relative overflow-hidden scroll-reveal-fast bg-[#0A0A0A]">
          {/* Fondo Ambiental: Resplandor de brasas */}
          <div className="absolute inset-0 bg-linear-to-br from-[#D32F2F]/20 via-[#0A0A0A] to-[#FD6A02]/10"></div>

          {/* Decoración de fondo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FD6A02]/10 rounded-full blur-[100px] -z-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="text-center">

              <div className="mb-8 flex justify-center">
                <span className="rounded-full bg-[#FD6A02]/10 px-4 py-1 text-sm font-bold leading-6 text-[#FD6A02] ring-1 ring-inset ring-[#FD6A02]/20 uppercase tracking-widest flex items-center gap-2">
                  <Flame className="text-lg"/> La mejor elección para tu asador
                </span>
              </div>

              {/* Título: Promesa de Valor para Negocio */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white uppercase tracking-tight">
                Potencia el sabor de <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] via-[#FFD700] to-[#FD6A02]">
                  tu negocio
                </span>
              </h1>

              {/* Título: Enfocado en el sabor y la tradición 
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-linear-to-r from-[#FD6A02] via-[#FFD700] to-[#FD6A02] bg-clip-text text-transparent animate-fade-in drop-shadow-sm uppercase tracking-tight">
                Elaborado con pasión y dedicación en cada bolsa. Tradición y amor.
              </h2>
              */}

              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-light">
                Carbón de Mezquite y Ébano seleccionado para <span className="text-[#FD6A02] font-bold"> alto rendimiento. 
                Abastecimiento constante </span> para restaurantes, cadenas y distribuidores mayoristas.
              </p>

              {/* Botones de Venta */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/contacto-distribuidor"
                  className="bg-[#FD6A02] hover:bg-[#e55a00] text-white px-8 py-4 font-bold text-lg transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] transform hover:scale-105 flex items-center gap-2 uppercase tracking-wide"
                >
                  Cotizar Mayoreo
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/productos"
                  className="bg-transparent border-2 border-white/20 text-white/90 hover:border-[#FFD700] hover:text-[#FFD700] px-8 py-4 font-bold text-lg transition-all duration-300 rounded-full flex items-center gap-2 backdrop-blur-sm"
                >
                  Ver Catálogo
                </Link>
              </div>

              {/* DATOS DEL CARBÓN (Los Modals Actualizados) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

                {/* Dato 1: Origen Tamaulipas */}
                <div className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#FD6A02]/50 transition-colors duration-300">
                  {/* Icono Mapa */}
                  <MapPin className="w-10 h-10 text-[#FD6A02] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-2">De Tamaulipas</div>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    Nacido en las tierras del norte, donde la carne asada es religión. Traemos lo mejor de la región directo a tu asador.
                  </p>
                </div>

                {/* Dato 2: Ébano y Mezquite */}
                <div className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#FFD700]/50 transition-colors duration-300">
                  {/* Icono Fuego/Madera */}
                  <Flame className="w-10 h-10 text-[#FFD700] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-2">Ébano y Mezquite</div>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    La mezcla premium: <span className="text-[#FFD700]">Ébano</span> para una brasa ardiente que dura horas y <span className="text-[#FD6A02]">Mezquite</span> para ese ahumado único.
                  </p>
                </div>

                {/* Dato 3: Hecho a Mano */}
                <div className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#D32F2F]/50 transition-colors duration-300">
                  {/* Icono Martillo/Trabajo Manual */}
                  <Hammer className="w-10 h-10 text-[#D32F2F] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-2">100% Artesanal</div>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    Cuidamos cada detalle. Desde la selección de la leña hasta el empacado manual, garantizando trozos grandes y limpios.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="py-16 bg-[#0A0A0A] scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                Lo Más <span className="text-[#FD6A02]">Vendido</span>
              </h2>
              <p className="text-gray-400 text-lg">El carbón que eligen los profesionales</p>
            </div>

            {/* Card grande estilo featured */}
            <div className="group relative block w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(253,106,2,0.3)] transition-all duration-500 cursor-pointer">
              {/* Imagen de fondo */}
              <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-700">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/carbon-tirado.jpg')`,
                  }}
                />
              </div>
              
              {/* Gradiente oscuro */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

              {/* Contenido */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">

                    {/* Badge Premium */}
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FD6A02] text-white text-xs md:text-sm font-black uppercase tracking-widest mb-6 shadow-lg shadow-[#FD6A02]/30 border border-white/10">
                        Calidad de Exportación
                    </span>

                    {/* Título Principal */}
                    <h3 className="text-4xl md:text-7xl font-black text-white mb-6 leading-none group-hover:text-[#FD6A02] transition-colors uppercase tracking-tight">
                        Carbón El Ranchero
                        <br />
                        <span className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#FD6A02]">
                            Mezquite Premium
                        </span>
                    </h3>

                    {/* Descripción con Actitud */}
                    <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
                        Trozos grandes de mezquite puro. Enciende rápido, dura horas y le da ese sabor ahumado que hace la diferencia.
                        <span className="block mt-2 text-white font-bold opacity-90">
                            Sin polvo. Sin químicos. <span className="text-[#FD6A02]">Sin mamadas.</span>
                        </span>
                    </p>

                </div>
                
                
                <div className="flex items-center gap-6 text-sm font-medium flex-wrap">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Flame className="w-5 h-5 text-[#FD6A02]" />
                    Enciende en 10 minutos
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-5 h-5 text-[#FD6A02]" />
                    Dura 3+ horas
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="w-5 h-5 text-[#FFD700]" />
                    Calidad Premium
                  </div>
                  <div className="flex items-center gap-2 text-white group-hover:translate-x-2 transition-transform ml-auto">
                    Ver Detalles <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de productos secundarios */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { name: 'Costal 20kg', image: '/costales.jpg', tag: 'Restaurantes' },
                { name: 'Bolsa 4kg', image: '/bolsas-ranchero.jpg', tag: 'Familias' },
                { name: 'Briquetas', image: '/briqueta-alm.jpg', tag: 'Profesional' },
              ].map((product, i) => (
                <div key={i} className="group relative h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FD6A02]/50 transition-all cursor-pointer">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold uppercase mb-2">
                      {product.tag}
                    </span>
                    <h4 className="text-2xl font-black text-white group-hover:text-[#FD6A02] transition-colors">
                      {product.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 relative overflow-hidden scroll-reveal">
          {/* Fondo con textura de madera */}
          <div className="absolute inset-0 bg-[#0A0A0A]">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="wood"><feTurbulence baseFrequency="0.05" numOctaves="8" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100" height="100" filter="url(%23wood)"/></svg>')`
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tight">
                Garantía <span className="text-[#FD6A02]">El Ranchero</span>
              </h2>
              <p className="text-gray-400 text-xl">Lo que dice la bolsa, lo cumple la brasa</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: 'Calidad Premium', desc: 'Trozos grandes, cero polvo', color: '#FFD700', image: 'photo-1529692236671-f1f6cf9683ba' },
                { icon: Zap, title: 'Enciende Rápido', desc: 'Prende a la primera, sin batallar', color: '#FD6A02', image: 'photo-1555939594-58d7cb561ad1' },
                { icon: Leaf, title: '100% Natural', desc: 'Sin químicos, sabor auténtico', color: '#D32F2F', image: 'photo-1558618666-fcd25c85cd64' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#FD6A02] transition-all">
                    {/* Imagen de fondo */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('https://images.unsplash.com/${item.image}?q=80&w=800&auto=format&fit=crop')` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/30" />

                    {/* Contenido */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <Icon className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" style={{ color: item.color }} />
                      <h3 className="text-3xl font-black mb-2 uppercase italic" style={{ color: item.color }}>
                        {item.title}
                      </h3>
                      <p className="text-white text-lg font-medium">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BusinessSolutions */}
        <section className="py-16 bg-[#0A0A0A] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Opción A: Restaurantes */}
              <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#FD6A02]/50 transition-colors group">
                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                  <ChefHat className="text-[#FD6A02]" /> Para Restaurantes
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex gap-2"><span className="text-[#FD6A02]">✓</span> Calidad estandarizada (siempre el mismo calor).</li>
                  <li className="flex gap-2"><span className="text-[#FD6A02]">✓</span> Menos merma y polvo = Más ahorro.</li>
                  <li className="flex gap-2"><span className="text-[#FD6A02]">✓</span> Facturación mensual.</li>
                </ul>
              </div>

              {/* Opción B: Distribuidores/Tiendas */}
              <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#FFD700]/50 transition-colors group">
                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="text-[#FFD700]" /> Para Distribuidores
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex gap-2"><span className="text-[#FFD700]">✓</span> Empaque resistente y atractivo para anaquel.</li>
                  <li className="flex gap-2"><span className="text-[#FFD700]">✓</span> Márgenes de ganancia competitivos.</li>
                  <li className="flex gap-2"><span className="text-[#FFD700]">✓</span> Proceso de empaque 100% hecho a mano.</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Perfomance */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 bg-[#0A0A0A] scroll-reveal">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tight">
              Garantía <span className="text-[#FD6A02]">El Ranchero</span>
            </h2>
            <p className="text-white/60 text-lg">
              Lo que dice la bolsa, lo cumple la brasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 2: CALIDAD PREMIUM (Literal de la bolsa) */}
            <div className="group bg-linear-to-br from-[#FFD700]/20 to-[#0A0A0A] p-6 rounded-2xl border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#FFD700] uppercase italic">Calidad Premium</h3>
                  <p className="text-white/40 text-sm uppercase tracking-wider">Selección Especial</p>
                </div>
                <Award className="w-12 h-12 text-[#FFD700] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-4xl font-extrabold text-white mb-2">Trozos Grandes</div>
              <div className="text-md text-[#FFD700] font-medium flex items-center gap-1">
                <Star className="w-6 h-6 text-[#FFD700] group-hover:scale-110 transition-transform" />
                Cero polvo, puro carbón
              </div>
            </div>

            {/* CARD 1: ENCENDIDO RÁPIDO (Literal de la bolsa) */}
            <div className="group bg-linear-to-br from-[#FD6A02]/20 to-[#0A0A0A] p-6 rounded-2xl border border-[#FD6A02]/30 hover:border-[#FD6A02] transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#FD6A02] uppercase italic">Enciende Rápido</h3>
                  <p className="text-white/40 text-sm uppercase tracking-wider">Sin batallar</p>
                </div>
                <Zap className="w-12 h-12 text-[#FD6A02] group-hover:scale-110 transition-transform" />
              </div>
              {/* Descripción visual */}
              <div className="text-4xl font-extrabold text-white mb-2">Instantáneo</div>
              <div className="text-md text-[#FD6A02] font-medium flex items-center gap-1">
                <Flame className="w-6 h-6 text-[#FD6A02] group-hover:scale-110 transition-transform"/> 
                Prende a la primera
              </div>
            </div>

            {/* CARD 3: 100% NATURAL / MEZQUITE (Literal de la bolsa) */}
            <div className="group bg-linear-to-br from-[#D32F2F]/20 to-[#0A0A0A] p-6 rounded-2xl border border-[#D32F2F]/30 hover:border-[#D32F2F] transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#D32F2F] uppercase italic">100% Natural</h3>
                  <p className="text-white/40 text-sm uppercase tracking-wider">Carbón de Mezquite</p>
                </div>
                <Leaf className="w-12 h-12 text-[#D32F2F] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-4xl font-extrabold text-white mb-2">Sin Químicos</div>
              <div className="text-md text-[#D32F2F] font-medium flex items-center gap-1">
                <TreeDeciduous className="w-6 h-6 text-[#D32F2F] group-hover:scale-110 transition-transform" /> 
                Sabor ahumado auténtico
              </div>
            </div>
          </div>

          {/* CTA Inferior */}
          <div className="text-center mt-12">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-[#FD6A02] hover:text-[#FFD700] font-bold text-lg transition-colors duration-300 group"
            >
              Ver todos nuestros productos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
        
        <section className="py-20 bg-linear-to-b from-[#0A0A0A] to-[#0f0f0f] scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                ¿Por qué los <span className="text-[#FD6A02]">expertos</span> nos eligen?
              </h2>
              <p className="text-gray-400 text-xl">No es solo fuego, es el ingrediente secreto</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: ChefHat, title: 'Perfil de Sabor Único', desc: 'El mezquite aporta notas ahumadas auténticas que elevan tus cortes', color: '#FD6A02' },
                { icon: DollarSign, title: 'Rentabilidad por Costal', desc: 'Rinde hasta 30% más que carbones comerciales', color: '#FFD700' },
                { icon: Flame, title: 'Temperatura Constante', desc: 'Brasa estable para control total de cocción', color: '#D32F2F' },
                { icon: ShieldCheck, title: 'Seguridad Operativa', desc: 'Minimiza chispas, protegiendo personal y comensales', color: 'white' },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="group bg-white/5 border border-white/10 hover:border-white/30 p-8 rounded-2xl transition-all hover:-translate-y-1">
                    <Icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" style={{ color: feature.color }} />
                    <h3 className="text-2xl font-bold mb-3" style={{ color: feature.color }}>{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#0A0A0A] py-16 scroll-reveal relative overflow-hidden">
            {/* Fondo sutil degradado */}
            <div className="absolute inset-0 bg-linear-to-b from-[#0A0A0A] via-[#110505] to-[#0A0A0A]"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-4">
                  ¿Por qué los <span className="text-[#FD6A02]">expertos</span> nos eligen?
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  No es solo fuego, es el ingrediente secreto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuresData.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    colorClass={feature.colorClass}
                    borderColor={feature.borderColor}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
        </section>

        {/* What You Get Section */}
        <section className="bg-[#0A0A0A] py-16 scroll-reveal relative overflow-hidden">

          {/* Fondo decorativo lateral */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#FD6A02]/5 to-transparent pointer-events-none"></div>

          <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tight">
                Más que carbón, <span className="text-[#FFD700]">certeza</span> para tu negocio
              </h2>
              <p className="text-gray-400">
                Estándares operativos diseñados para parrilleros profesionales y distribuidores.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Item 1 */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Selección Manual</h3>
                  <p className="text-gray-400 text-sm">
                    No usamos máquinas ciegas. Todo el proceso es hecho 100% a mano, desde la limpieza hasta el envasado.
                  </p>
                </div>
              </div>

              {/* 2. KILOS COMPLETOS (Se queda - Es honestidad) */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Kilos Completos (Garantizado)</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Lo que pagas es lo que recibes. Pesamos cada costal con básculas calibradas industrialmente.
                  </p>
                </div>
              </div>

              {/* 3. STOCK BLINDADO (Nuevo - Vital para no parar la operación) */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Stock Blindado</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Mantenemos inventario de seguridad para nuestros socios. Nunca te quedarás sin brasa en fin de semana.
                  </p>
                </div>
              </div>

              {/* 4. CERO MERMA (Se queda - Es rentabilidad) */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Cero Merma por Polvo</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Nuestros procesos de cribado eliminan la tierra. No pagas por basura que ahoga tu fuego.
                  </p>
                </div>
              </div>

              {/* Item 2: Fiscal */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Facturación Inmediata</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Sabemos que necesitas deducir. Tu factura se genera y envía automáticamente al confirmar tu pedido en el sistema.
                  </p>
                </div>
              </div>

              {/* 6. TRAZABILIDAD (Se queda - Es legalidad) */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Trazabilidad Legal</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Todo nuestro mezquite cuenta con permisos de aprovechamiento forestal de SEMARNAT.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Envase Resistente</h3>
                  <p className="text-gray-400 text-sm">
                    Bolsa reforzada de doble capa. Llega a tu casa entera, sin roturas, ni derrames y con buen presentación.
                  </p>
                </div>
              </div>


              {/* 5. ENVASE RESISTENTE (Se queda - Es logística) */}
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#FFD700]/30 transition-colors group">
                <CheckCircle2 className="w-6 h-6 text-[#FFD700] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Sacos Reforzados</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Papel kraft de doble capa cosido industrialmente. Resiste la estiba y el transporte rudo.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 scroll-reveal bg-[#0A0A0A]">
          {/* Títulos */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white uppercase tracking-tight">
              Del Costal a tu <span className="text-[#FD6A02]">Negocio</span>
            </h2>
            <p className="text-white/60 text-lg">
              Cómo abastecerse en 4 simples pasos
            </p>
          </div>

          {/* Grid de Pasos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Línea conectora sutil para desktop (opcional) */}
            <div className="hidden lg:block absolute top-[20%] left-0 w-full h-0.5 -z-10"></div>

            {stepsData.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                colorTheme={step.colorTheme}
                showArrow={step.showArrow} // El último paso no lleva flecha
              />
            ))}
          </div>

          {/* Botón de Acción Final */}
          <div className="text-center mt-16">
            <Link
              href="/comprar"
              className="group bg-[#FD6A02] hover:bg-[#e55a00] px-10 py-5 font-bold text-xl text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(253,106,2,0.4)] hover:shadow-[0_0_25px_rgba(253,106,2,0.6)] transform hover:scale-105 inline-flex items-center gap-3 uppercase tracking-wider"
            >
              Cotizar Mayoreo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>      

        <section className="relative py-32 overflow-hidden scroll-reveal">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/60" />

          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex p-6 rounded-full bg-linear-to-br from-[#FD6A02] to-[#D32F2F] mb-8 shadow-[0_0_40px_rgba(253,106,2,0.6)] animate-pulse-slow">
              <Flame className="w-20 h-20 text-white" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase leading-tight">
              ¿Listo para llevar tu parrilla
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#FFD700]">
                al siguiente nivel?
              </span>
            </h2>

            <p className="text-2xl text-gray-300 mb-12 font-light">
              No arriesgues tu operación con carbón de mala calidad. <br className="hidden md:block" />
              <strong className="text-white">Asegura el abasto, rendimiento y sabor</strong> que tu negocio merece.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
              className="cursor-pointer group bg-[#FD6A02] hover:bg-[#e55a00] px-12 py-6 font-black text-2xl text-white transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(253,106,2,0.5)] hover:shadow-[0_0_50px_rgba(253,106,2,0.7)] transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 uppercase tracking-wider">
                Solicitar Alta
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
              className="cursor-pointer group bg-transparent border-2 border-white/30 hover:border-[#FFD700] text-white hover:text-[#FFD700] px-12 py-6 font-bold text-2xl transition-all duration-300 rounded-full inline-flex items-center justific-center gap-3 backdrop-blur-sm ">
                Ver Catálogo
              </button>
            </div>

            <p className="text-gray-500 mt-10 text-sm uppercase tracking-widest">
              Envíos a CDMX, Edo. Méx y Área Metropolitana • Calidad Garantizada
            </p>
          </div>
        </section>  

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden scroll-reveal">
          {/* Fondo: Un degradado oscuro que simula el fondo de un asador */}
          <div className="absolute inset-0 bg-linear-to-t from-[#D32F2F]/30 via-[#0A0A0A] to-[#0A0A0A]"></div>

          {/* Decoración de fondo (chispas sutiles) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">

            {/* Icono Principal */}
            <div className="inline-flex p-4 rounded-full bg-linear-to-br from-[#FD6A02] to-[#D32F2F] mb-8 shadow-[0_0_30px_rgba(253,106,2,0.5)] animate-pulse-slow">
              <Flame className="w-16 h-16 text-white" />
            </div>

            {/* TÍTULO: Enfocado en subir de nivel (apela al Chef y al Distribuidor) */}
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tight leading-tight">
              ¿Listo para llevar tu parrilla <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#FFD700]">
                al siguiente nivel?
              </span>
            </h2>

            {/* SUBTÍTULO: Habla de abasto y calidad constante */}
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              No arriesgues tu operación con carbón de mala calidad. Asegura el <strong>abasto, rendimiento y sabor</strong> que tu negocio merece.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* BOTÓN 1: El CTA Principal (Ir al formulario de alta) */}
              <Link
                href="/contacto-distribuidor" 
                className="group bg-[#FD6A02] hover:bg-[#e55a00] px-12 py-5 font-bold text-xl text-white transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_40px_rgba(253,106,2,0.6)] transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 uppercase tracking-wider"
              >
                Solicitar Alta de Cliente
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* BOTÓN 2: Catálogo o WhatsApp */}
              <Link
                href="/catalogo"
                className="group bg-transparent border-2 border-white/20 hover:border-[#FFD700] text-white hover:text-[#FFD700] px-12 py-5 font-bold text-xl transition-all duration-300 rounded-full inline-flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                Ver Catálogo
              </Link>
            </div>

            {/* MICRO-COPY: Zonas de cobertura (Esto da mucha confianza local) */}
            <p className="text-gray-500 mt-8 text-sm font-medium tracking-widest uppercase">
              Envíos a CDMX, Edo. Mex y Área Metropolitana • Calidad Garantizada
            </p>
          </div>
        </section>
      </main>

      {/* Footer Disclaimer - Full Width Modern Design */}
      <footer className="bg-[#050505] border-t border-[#FD6A02]/20 pt-16 pb-8 text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* --- SECCIÓN DE SEGURIDAD (Reemplaza al Crypto Disclaimer) --- */}
          {/* Usamos el amarillo de advertencia de la bolsa */}
          <div className="relative bg-[#FACC15]/5 backdrop-blur-sm border border-[#FACC15]/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-[#FACC15]/5 mb-12">
             {/* Patrón de fondo sutil */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.1),transparent_40%)] rounded-2xl"></div>

             <div className="relative flex flex-col md:flex-row gap-6 items-start">
                {/* Icono de Advertencia */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#FACC15]/10 flex items-center justify-center ring-1 ring-[#FACC15]/30">
                  <ShieldAlert className="w-6 h-6 text-[#FACC15]" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#FACC15] mb-2 uppercase tracking-wide">
                    Precaución: Monóxido de Carbono
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed max-w-3xl">
                    Quemar carbón en espacios cerrados puede ser fatal. La combustión emite monóxido de carbono, el cual no tiene olor. 
                    <span className="text-white font-bold"> NUNCA queme carbón dentro de casas, vehículos o tiendas de campaña.</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="flex items-center gap-2 text-gray-400">
                        <Flame className="w-4 h-4 text-[#FD6A02]" />
                        <span>El carbón chispea mientras está encendido</span>
                     </div>
                     <div className="flex items-center gap-2 text-gray-400">
                        <Flame className="w-4 h-4 text-[#FD6A02]" />
                        <span>Manténgase alejado de niños y mascotas</span>
                     </div>
                  </div>
                </div>
             </div>
          </div>

          {/* --- LINKS Y NAVEGACIÓN --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-white/10 pb-12">

            {/* Columna 1: La Marca */}
            <div className="col-span-1 md:col-span-1">
               <h4 className="text-2xl font-black text-white uppercase italic mb-4">
                 El Ranchero<span className="text-[#FD6A02]">.</span>
               </h4>
               <p className="text-gray-500 mb-6">
                 Tradición encendida desde 1923. Llevando el auténtico sabor a las parrillas de todo México.
               </p>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FD6A02] hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FD6A02] hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FD6A02] hover:text-white transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
               </div>
            </div>

            {/* Columna 2: Productos */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Productos</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Carbón El Ranchero 3 kg </a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Carbón El Ranchero 4 kg </a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Costales de 20 - 35 kg (Revuelto - Mediano) </a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Costales de 20 (Grande)</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Costales de 30 kg (Extra-Grande)</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Briquetas Sierra Madre</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Briquetas Ta´ Con Madre</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Iniciadores de Fuego</a></li>
              </ul>
            </div>

            {/* Columna 3: Empresa */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Empresa</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Nuestra Historia</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Sé Distribuidor</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Contacto Ventas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Blog Parrillero</a></li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Ubicación</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-[#FD6A02] mt-0.5" />
                  <span>
                    Calle Primavera No. 11<br />
                    Col. San Bartolo Centro<br />
                    Naucalpan, Edo. de México
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="block text-white font-bold">Teléfonos:</span>
                  (55) 5576 0890 / 5576 9704
                </li>
              </ul>
            </div>
          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">

            {/* IZQUIERDA: Copyright + Créditos Dev */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-gray-500 text-xs">
                © 2025 Salvador González Tolentino. Todos los derechos reservados.
              </p>

              {/* TU FIRMA DE DESARROLLADOR */}
              <p className="text-[10px] text-gray-700">
                Hecho por: <span className="font-bold text-gray-600">Mario Morales</span> 
                <span className="mx-1">•</span> 
                Contacto: <a href="mailto:mora.sant.mario@gmail.com" className="hover:text-[#FD6A02] transition-colors">mora.sant.mario@gmail.com</a>
              </p>
            </div>

            {/* DERECHA: Enlaces Legales */}
            <div className="flex gap-6 text-xs font-medium items-center">
               <button 
                 onClick={() => setShowPrivacyModal(true)} 
                 className="text-gray-500 hover:text-white transition-colors cursor-pointer"
               >
                 Aviso de Privacidad
               </button>

               <button 
                 onClick={() => setShowConditionModal(true)} 
                 className="text-gray-500 hover:text-white transition-colors cursor-pointer"
               >
                 Términos y Condiciones
               </button>

               <span className="text-gray-700 hidden sm:inline">|</span>

               <span className="text-[#FD6A02] font-bold">HECHO EN MÉXICO 🇲🇽</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modals */}

      {/* 1. Modal de Seguridad (Antes Disclaimer) */}
      <Modal isOpen={showDisclaimerModal} onClose={() => setShowDisclaimerModal(false)} maxWidth="max-w-4xl">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-[#FACC15] uppercase">Seguridad y Precaución</h3>
            <button
              onClick={() => setShowDisclaimerModal(false)}
              className="text-gray-400 cursor-pointer hover:text-white text-2xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Tarjeta de Peligro Mortal */}
              <div className="bg-[#D32F2F]/10 border border-[#D32F2F]/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TriangleAlert className="w-5 h-5 text-[#D32F2F]" />
                  <h4 className="font-bold text-[#D32F2F] uppercase">Peligro Mortal</h4>
                </div>
                <ul className="text-xs space-y-2 text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#D32F2F] font-bold">•</span>
                    <span>NUNCA usar en interiores (casas, tiendas de campaña, vehículos).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#D32F2F] font-bold">•</span>
                    <span>El Monóxido de Carbono es invisible, inodoro y letal.</span>
                  </li>
                </ul>
              </div>

              {/* Tarjeta de Manejo de Fuego */}
              <div className="bg-[#FD6A02]/10 border border-[#FD6A02]/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-[#FD6A02]" />
                  <h4 className="font-bold text-[#FD6A02] uppercase">Manejo del Fuego</h4>
                </div>
                <ul className="text-xs space-y-2 text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#FD6A02] font-bold">•</span>
                    <span>El carbón puede lanzar chispas. Mantener distancia.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#FD6A02] font-bold">•</span>
                    <span>Asegúrese de apagar completamente las brasas con agua o arena.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg text-xs leading-relaxed border-l-4 border-[#FACC15]">
              <strong className="text-[#FACC15] block mb-1">RESPONSABILIDAD DEL USUARIO:</strong>
              El uso de fuego conlleva riesgos inherentes. "El Ranchero" no se hace responsable por daños materiales o de salud derivados del uso incorrecto, negligente o en espacios sin ventilación adecuada de nuestros productos.
            </div>

            <div className="pt-3 border-t border-white/10 text-center">
              <p className="text-xs text-gray-500">
                En caso de emergencia o intoxicación, llame al 911 inmediatamente y ventile el área.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowDisclaimerModal(false)}
              className="bg-[#FD6A02] hover:bg-[#e55a00] text-white font-bold cursor-pointer px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-xs"
            >
              He leído y comprendo los riesgos
            </button>
          </div>
        </Modal>

      {/* 2. Modal de Privacidad */}
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} >
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-white uppercase">Aviso de Privacidad</h3>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="text-gray-400 hover:text-white cursor-pointer text-2xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 text-sm text-gray-300">
             {/* Puedes mantener tu imagen o poner texto dummy */}
            <div className="bg-white/5 p-6 rounded-xl text-center border border-dashed border-gray-600">
                <p className="text-xs text-gray-500">Sus datos personales (Dirección de envío, Teléfono) son utilizados únicamente para la logística de entrega de los costales.</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="bg-transparent border border-[#FD6A02] text-[#FD6A02] hover:bg-[#FD6A02] hover:text-white font-bold cursor-pointer px-6 py-2 rounded-full transition-colors uppercase text-xs"
            >
              Cerrar
            </button>
          </div>
        </Modal>

      {/* 3. Modal de Contacto */}
      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} maxWidth="max-w-lg">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-[#FD6A02] uppercase">Hablemos de Carbón</h3>
            <button
              onClick={() => setShowContactModal(false)}
              className="text-gray-400 cursor-pointer hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="space-y-6 text-sm text-gray-300">
            <p className="text-center text-gray-400">¿Tienes dudas sobre tu pedido o quieres ser distribuidor?</p>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#FD6A02]/20 flex items-center justify-center text-[#FD6A02]">
                        <Phone className="font-bold" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Teléfonos</p>
                        <p className="text-white font-bold text-lg">(55) 5576 0890</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#FD6A02]/20 flex items-center justify-center text-[#FD6A02]">
                        <MapPin className="font-bold"/>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Ubicación</p>
                        <p className="text-white font-medium">Naucalpan, Edo. de México</p>
                    </div>
                </div>
            </div>

          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowContactModal(false)}
              className="bg-[#FD6A02] hover:bg-[#e55a00] text-white font-bold cursor-pointer px-6 py-2 rounded-full transition-colors"
            >
              Entendido
            </button>
          </div>
        </Modal>

      {/* 4. Modal de Términos y Condiciones */}
      <Modal isOpen={showConditionModal} onClose={() => setShowConditionModal(false)} maxWidth="max-w-4xl">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-white uppercase">Términos y Condiciones</h3>
            <button
              onClick={() => setShowConditionModal(false)}
              className="text-gray-400 cursor-pointer hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 text-sm text-gray-300 pr-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/5">

            <h4 className="font-bold text-base text-[#FFD700] mb-1">1. Uso del Producto</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>El carbón vegetal "El Ranchero" está diseñado exclusivamente para uso recreativo y culinario en exteriores (parrillas, asadores). Cualquier otro uso (industrial, calefacción interna) está estrictamente prohibido bajo estos términos.</p>

            <h4 className="font-bold text-base text-[#FFD700] mb-1">2. Almacenamiento</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>El cliente es responsable de almacenar el producto en un lugar seco y alejado de fuentes de ignición. "El Ranchero" no se hace responsable por producto humedecido o dañado por mal almacenamiento después de la entrega.</p>

            <h4 className="font-bold text-base text-[#FFD700] mb-1">3. Política de Devoluciones</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>Debido a la naturaleza del producto, solo se aceptan devoluciones si el costal presenta defectos de fábrica (roturas mayores al recibirlo) o si el peso es considerablemente menor al declarado. Debe reportarse en las primeras 24 horas.</p>

            <h4 className="font-bold text-base text-[#FFD700] mb-1">4. Limitación de Responsabilidad</h4>
            <p className='text-xs space-y-1 mb-4 text-gray-400'>La empresa no se hace responsable por accidentes, incendios o intoxicaciones provocadas por negligencia, uso en interiores o falta de supervisión del fuego generado con nuestros productos.</p>

            <h4 className="font-bold text-base text-[#FFD700] mb-1">5. Distribuidores</h4>
            <p className='text-xs space-y-1 mb-0 text-gray-400'>La reventa de este producto está permitida, pero la alteración del empaque, la mezcla con otros carbones de menor calidad o la venta bajo otra marca sin autorización constituye una violación de estos términos.</p>

            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowConditionModal(false)}
              className="bg-[#FD6A02] hover:bg-[#e55a00] text-white font-bold cursor-pointer px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-xs shadow-lg shadow-[#FD6A02]/20"
            >
              Acepto los términos
            </button>
          </div>
        </Modal>

    </div>
  );
}