'use client'

import { useState, useEffect, useRef } from 'react';
import Modal from './components/Modal';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { TriangleAlert, ArrowRight, ShoppingBag, User, Menu, Briefcase, DollarSign,  ShieldCheck, Package, X, Zap, Instagram, Facebook, Twitter, ShieldAlert, Scale, FileCheck, Award, Leaf, CheckCircle2, Flame, Hammer, Star, MapPin, Thermometer, Clock, BookOpen, AlertTriangle, Phone, ShoppingCart, ChefHat } from 'lucide-react';

{/* Feature Card Component Props 
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  colorClass: string;
  description: string;
  borderColor: string;
}

  const featuresData: FeatureCardProps[] = [
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
  */}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  colorTheme: 'orange' | 'red' | 'gold' | 'gray'; 
  showArrow: boolean;
}

const stepsData: StepCardProps[] = [
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

function StepCard({ number, title, description, colorTheme, showArrow }: StepCardProps) {
  
  // MAPA DE COLORES "EL RANCHERO"
  const colorStyles = {
    orange: { 
      bgCircle: 'bg-[#FD6A02]',
      shadow: 'shadow-[0_0_20px_rgba(253,106,2,0.4)]',
      bgCard: 'bg-gradient-to-b from-[#FD6A02]/10 to-transparent',
      border: 'border-[#FD6A02]/30',
      hoverBorder: 'group-hover:border-[#FD6A02]',
      text: 'text-[#FD6A02]',
    },
    red: { 
      bgCircle: 'bg-[#D32F2F]',
      shadow: 'shadow-[0_0_20px_rgba(211,47,47,0.4)]',
      bgCard: 'bg-gradient-to-b from-[#D32F2F]/10 to-transparent',
      border: 'border-[#D32F2F]/30',
      hoverBorder: 'group-hover:border-[#D32F2F]',
      text: 'text-[#D32F2F]',
    },
    gold: { 
      bgCircle: 'bg-[#FFD700]',
      shadow: 'shadow-[0_0_20px_rgba(255,215,0,0.4)]',
      bgCard: 'bg-gradient-to-b from-[#FFD700]/10 to-transparent',
      border: 'border-[#FFD700]/30',
      hoverBorder: 'group-hover:border-[#FFD700]',
      text: 'text-[#FFD700]',
    },
    gray: { 
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#FD6A02] selection:text-[#0A0A0A] font-sans">

      {/* --- HEADER --- */}
      <Navbar />

      <main>
        {/* Disclaimer Banner - Modern Design */}

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
                <span className="rounded-full bg-[#FD6A02]/20 px-4 py-2 text-xs md:text-sm font-bold text-[#FD6A02] ring-1 ring-inset ring-[#FD6A02]/30 uppercase tracking-widest backdrop-blur-sm">
                   La mejor elección de carbón
                </span>
              </div>

              {/* Título: Ajustado para Móvil (text-4xl) */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-none">
                Carbón que
                <br />
                <span className="text-[#FD6A02] italic">sabe a tradición</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
                100% Mezquite y Ébano. Hecho a mano en <span className="text-[#FFD700] font-bold">Tamaulipas</span>, 
                donde la carne asada es religión.
              </p>

              {/* Stats: Espacio reducido en móvil (gap-4) */}
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
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] z-20 animate-fade-in">
            <div 
              className="w-full h-full bg-cover bg-center transform rotate-12 hover:rotate-6 transition-transform duration-700"
              style={{
                backgroundImage: "url('/ranchero-fondo.jpg')",
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))'
              }}
            />
          </div>
        </section>
        
        {/* Hero Section for Business Clients */}
        <section className="relative min-h-screen overflow-hidden scroll-reveal-fast bg-[#0A0A0A] scroll-reveal">
          {/* Fondo Ambiental: Resplandor de brasas */}
          <div className="absolute inset-0 bg-linear-to-br from-[#D32F2F]/20 via-[#0A0A0A] to-[#FD6A02]/10"></div>

          {/* Decoración de fondo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FD6A02]/10 rounded-full blur-[100px] -z-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
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
                  href="/interest"
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

        {/* Perfomance */}
        <section className="py-10 relative overflow-hidden scroll-reveal">
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
                { icon: Award, title: 'Calidad Premium', desc: 'Trozos grandes, cero polvo', color: '#FFD700', image: '/carbon-prendidp.jpg' },
                { icon: Zap, title: 'Enciende Rápido', desc: 'Prende a la primera, sin batallar', color: '#FD6A02', image: '/torre.jpg' },
                { icon: Leaf, title: '100% Natural', desc: 'Sin químicos, sabor auténtico', color: '#D32F2F', image: '/bolsas.jpg' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="cursor-pointer group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#FD6A02] transition-all">
                    {/* Imagen de fondo */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${item.image}')` }}
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

        {/* Features Section */}
        <section className="py-20  bg-linear-to-br from-[#D32F2F]/20 via-[#0A0A0A] to-[#FD6A02]/10 scroll-reveal">
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

        <section className="py-10 bg-linear-to-b from-[#0f0f0f] to-[#0A0A0A]  scroll-reveal">
          {/* Fondo con textura de madera */}
          <div className="absolute inset-0 bg-[#0A0A0A]">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="wood"><feTurbulence baseFrequency="0.05" numOctaves="8" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100" height="100" filter="url(%23wood)"/></svg>')`
            }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                Lo Más <span className="text-[#FD6A02]">Vendido</span>
              </h2>
              <p className="text-gray-400 text-lg">El carbón que eligen los profesionales</p>
            </div>

            {/* Card grande estilo featured */}
            <div className="group relative block w-full h-auto min-h-[450px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(253,106,2,0.3)] transition-all duration-500 cursor-pointer">
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
                    <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-none group-hover:text-[#FD6A02] transition-colors uppercase tracking-tight">
                        Carbón El Ranchero
                        <br />
                        <span className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#FD6A02]">
                            Mezquite Premium
                        </span>
                    </h3>

                    {/* Descripción con Actitud */}
                    <p className="text-gray-300 text-sm md:text-2xl max-w-2xl mx-auto mb-6 md:mb-8 font-medium leading-relaxed">
                        Trozos grandes de mezquite puro. Enciende rápido, dura horas y le da ese sabor ahumado.
                        <span className="block mt-2 text-white font-bold opacity-90">
                             Sin polvo. Sin químicos.
                        </span>
                    </p>

                </div>

                <div className="flex items-center justify-center gap-4 text-xs md:text-sm font-medium flex-wrap">
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

        {/* What You Get Section */}
        <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto from-[#0A0A0A] to-[#0f0f0f] scroll-reveal">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* COLUMNA IZQUIERDA: El Manifiesto (Texto con actitud) */}
            <div>
              <span className="text-[#FD6A02] font-black tracking-widest text-xs uppercase mb-4 block">
                Nuestra Filosofía
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-none tracking-tight">
                Tres promesas que <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FD6A02] to-[#D32F2F]">
                  no rompemos
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Sabemos que en la cocina no hay margen de error. Si el carbón falla, el servicio se cae. Por eso, nos enfocamos en lo que te importa:
              </p>

              {/* Lista de Cotejo "Ruda" */}
              <div className="space-y-6">

                {/* Punto 1 */}
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-[#FD6A02]/10 flex items-center justify-center border border-[#FD6A02]/20">
                      <Flame className="w-5 h-5 text-[#FD6A02]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Brasa de Aguante</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Olvídate de recargar el asador cada 20 minutos. Nuestro Ébano mantiene temperatura alta por horas, no por minutos.
                    </p>
                  </div>
                </div>

                {/* Punto 2 */}
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center border border-[#FFD700]/20">
                      <Scale className="w-5 h-5 text-[#FFD700]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Kilos de a Kilo</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Aquí no vendemos aire ni polvo. Si el costal dice 20kg, recibes 20kg de producto útil. Pesado y garantizado.
                    </p>
                  </div>
                </div>

                {/* Punto 3 */}
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Tu Bodega Nunca Vacía</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Entendemos la urgencia. Mantenemos stock de seguridad para que, aunque sea temporada alta, tú tengas fuego.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* COLUMNA DERECHA: Datos Duros (Visual más técnico/B2B) */}
            <div className="relative">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-linear-to-tr from-[#FD6A02]/20 via-transparent to-transparent rounded-3xl blur-2xl -z-10"></div>

              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FileCheck className="w-24 h-24 text-white" />
                </div>

                <h3 className="text-2xl font-black text-white mb-6 uppercase">
                  Checklist Administrativo
                </h3>
                <p className="text-gray-400 text-sm mb-8">
                  Para que tu contador y tu jefe de compras también estén felices:
                </p>

                <ul className="space-y-4">
                  {/* Item 1 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-[#FD6A02]/30 hover:shadow-[0_0_15px_rgba(253,106,2,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Facturación</span>
                    <span className="text-[#FD6A02] font-bold text-sm bg-[#FD6A02]/10 px-3 py-1 rounded-full border border-[#FD6A02]/20">Automática</span>
                  </li>

                  {/* Item 2 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Permisos SEMARNAT</span>
                    <span className="text-[#FFD700] font-bold text-sm bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/20">Vigentes</span>
                  </li>

                  {/* Item 3 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Empaque</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">Uso Rudo (3 Capas)</span>
                  </li>

                  {/* Item 4 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-[#FD6A02]/30 hover:shadow-[0_0_15px_rgba(253,106,2,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Envíos</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">CDMX y Edo. Mex</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                   <p className="text-xs text-gray-500 italic">
                     "El único carbón que rinde más que el turno del parrillero."
                   </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECCIÓN 2: Business Solutions */}
        <section className="relative py-12 px-4 md:px-6 bg-linear-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A] border-y border-white/5 overflow-hidden scroll-reveal">

        {/* Fondo */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/giro-negocio.png')" }}
        />

          {/* CAMBIO: max-w-7xl para que las tarjetas sean más anchas */}
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase">
                Soluciones por volumen
              </h2>
              <p className="text-gray-400 text-lg">
                Precios y condiciones según tu tipo de negocio
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">

              {/* Restaurantes y Parrillas */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#FD6A02]/10 via-[#0A0A0A] to-[#0A0A0A] border border-[#FD6A02]/30 p-8 md:p-10 transition-all duration-500 group hover:border-[#FD6A02] hover:shadow-[0_0_60px_rgba(253,106,2,0.15)] hover:-translate-y-2 hover:scale-[1.02]">
                
                {/* Luz de fondo que se intensifica al hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD6A02]/10 blur-3xl rounded-full group-hover:bg-[#FD6A02]/20 transition-colors duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    {/* Icono más grande y con fondo */}
                    <div className="w-16 h-16 rounded-2xl bg-[#FD6A02]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ChefHat className="w-8 h-8 text-[#FD6A02]" />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic text-white group-hover:text-[#FD6A02] transition-colors">
                        Restaurantes
                    </h3>
                  </div>

                  <ul className="space-y-5 mb-10">
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#FD6A02] rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FD6A02]"></div>
                      <span className="text-gray-300 text-lg">Calidad estandarizada en cada pedido</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#FD6A02] rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FD6A02]"></div>
                      <span className="text-gray-300 text-lg">Facturación mensual disponible</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#FD6A02] rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FD6A02]"></div>
                      <span className="text-gray-300 text-lg">Entregas programadas a la puerta</span>
                    </li>
                  </ul>

                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Volumen mínimo</p>
                        <p className="text-3xl font-black text-white group-hover:text-[#FD6A02] transition-colors">10 costales<span className="text-lg text-gray-500 font-medium">/pedido</span></p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-[#FD6A02] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Distribuidores */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#FFD700]/10 via-[#0A0A0A] to-[#0A0A0A] border border-[#FFD700]/30 p-8 md:p-10 transition-all duration-500 group hover:border-[#FFD700] hover:shadow-[0_0_60px_rgba(255,215,0,0.15)] hover:-translate-y-2 hover:scale-[1.02]">
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 blur-3xl rounded-full group-hover:bg-[#FFD700]/20 transition-colors duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ShoppingCart className="w-8 h-8 text-[#FFD700]" />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic text-white group-hover:text-[#FFD700] transition-colors">
                        Distribuidores
                    </h3>
                  </div>

                  <ul className="space-y-5 mb-10">
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FFD700]"></div>
                      <span className="text-gray-300 text-lg">Empaque con presentación premium</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FFD700]"></div>
                      <span className="text-gray-300 text-lg">Márgenes competitivos para reventa</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FFD700]"></div>
                      <span className="text-gray-300 text-lg">Soporte en estrategia de anaquel</span>
                    </li>
                  </ul>

                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Volumen mínimo</p>
                        <p className="text-3xl font-black text-white group-hover:text-[#FFD700] transition-colors">200 bolsas<span className="text-lg text-gray-500 font-medium">/pedido</span></p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-[#FFD700] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link // Usamos Link si es navegación interna, o button si abre modal
                href="/interest"
                className="bg-[#FD6A02] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e55a00] transition-all shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] hover:-translate-y-1 inline-flex items-center gap-2 group uppercase tracking-wide"
              >
                Solicitar cotización
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 scroll-reveal bg-[#0A0A0A] scroll-reveal">
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
              href="/interest"
              className="group bg-[#FD6A02] hover:bg-[#e55a00] px-10 py-5 font-bold text-xl text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(253,106,2,0.4)] hover:shadow-[0_0_25px_rgba(253,106,2,0.6)] transform hover:scale-105 inline-flex items-center gap-3 uppercase tracking-wider"
            >
              Cotizar Mayoreo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>      
        
        {/* Final CTA */}
        <section className="relative py-32 overflow-hidden scroll-reveal">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/carne-asada.jpg')` }}
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
              <Link href={"/interest"}
              className="cursor-pointer group bg-[#FD6A02] hover:bg-[#e55a00] px-12 py-6 font-black text-2xl text-white transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(253,106,2,0.5)] hover:shadow-[0_0_50px_rgba(253,106,2,0.7)] transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 uppercase tracking-wider">
                Solicitar Alta
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={"/productos"} className="cursor-pointer group bg-transparent border-2 border-white/30 hover:border-[#FFD700] text-white hover:text-[#FFD700] px-12 py-6 font-bold text-2xl transition-all duration-300 rounded-full inline-flex items-center justific-center gap-3 backdrop-blur-sm ">
                Ver Catálogo
              </Link>
            </div>

            <p className="text-gray-500 mt-10 text-sm uppercase tracking-widest">
              Envíos a CDMX, Edo. Méx y Área Metropolitana • Calidad Garantizada
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
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">
                  Nuestros Productos
              </h4>
              <ul className="space-y-3">
                {/* 1. RETAIL (Bolsas) */}
                <li>
                    <Link href="/productos" className="text-gray-400 hover:text-[#FD6A02] transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD6A02]/50 group-hover:bg-[#FD6A02] transition-colors"></span>
                        Línea Retail (Para Casa)
                    </Link>
                </li>

                {/* 2. MAYOREO (Costales) */}
                <li>
                    <Link href="/productos" className="text-gray-400 hover:text-[#FD6A02] transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD6A02]/50 group-hover:bg-[#FD6A02] transition-colors"></span>
                        Línea Mayoreo (Restaurantes)
                    </Link>
                </li>

                {/* 3. GOURMET (Briquetas) */}
                <li>
                    <Link href="/productos" className="text-gray-400 hover:text-[#FD6A02] transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD6A02]/50 group-hover:bg-[#FD6A02] transition-colors"></span>
                        Especialidad Gourmet
                    </Link>
                </li>

                {/* 4. ACCESORIOS */}
                <li>
                    <Link href="/productos" className="text-gray-400 hover:text-[#FD6A02] transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD6A02]/50 group-hover:bg-[#FD6A02] transition-colors"></span>
                        Iniciadores y Accesorios
                    </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Empresa */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Empresa</h4>
              <ul className="space-y-3">
                <li><a href="/tradicion" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Nuestra Historia</a></li>
                <li><a href="/interest" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Sé Distribuidor</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-[#FD6A02] transition-colors">Nuestros Aliados</a></li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-6">Ubicación</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-[#FD6A02] mt-0.5" />
                  <span>
                    Calle No. 11<br />
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="block text-white font-bold">Teléfonos:</span>
                  (55) xxxx xxxx / xxxx xxxx
                </li>
              </ul>
            </div>
          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">

            {/* IZQUIERDA: Copyright + Créditos Dev */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-gray-500 text-xs">
                © 2025 Fernando . Todos los derechos reservados.
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