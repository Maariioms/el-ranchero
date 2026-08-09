'use client'

import { useState, useEffect, useRef } from 'react';
import Modal from './components/Modal';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TriangleAlert, ArrowRight, ShoppingBag, User, Menu, Briefcase, DollarSign,  ShieldCheck, Package, X, Truck, Scale, FileCheck, Award, Leaf, CheckCircle2, Flame, Hammer, Star, MapPin, Thermometer, Clock, BookOpen, AlertTriangle, Phone, ShoppingCart, ChefHat } from 'lucide-react';

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
    colorClass: "text-accent", // Naranja
    borderColor: "group-hover:border-accent"
  },
  {
    title: "Rentabilidad por Costal",
    description: "Rinde hasta 30% más que carbones comerciales",
    icon: DollarSign,
    colorClass: "text-gold", // Oro (Dinero/Ahorro)
    borderColor: "group-hover:border-gold"
  },
  {
    title: "Temperatura Constante",
    description: "Brasa estable para control total de cocción",
    icon: Flame,
    colorClass: "text-danger", // Rojo
    borderColor: "group-hover:border-danger"
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
      bgCircle: 'bg-accent',
      shadow: 'shadow-[0_0_20px_rgba(253,106,2,0.4)]',
      bgCard: 'bg-gradient-to-b from-accent/10 to-transparent',
      border: 'border-accent/30',
      hoverBorder: 'group-hover:border-accent',
      text: 'text-accent',
    },
    red: { 
      bgCircle: 'bg-danger',
      shadow: 'shadow-[0_0_20px_rgba(211,47,47,0.4)]',
      bgCard: 'bg-gradient-to-b from-danger/10 to-transparent',
      border: 'border-danger/30',
      hoverBorder: 'group-hover:border-danger',
      text: 'text-danger',
    },
    gold: { 
      bgCircle: 'bg-gold',
      shadow: 'shadow-[0_0_20px_rgba(255,215,0,0.4)]',
      bgCard: 'bg-gradient-to-b from-gold/10 to-transparent',
      border: 'border-gold/30',
      hoverBorder: 'group-hover:border-gold',
      text: 'text-gold',
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
        <span className="text-2xl font-black text-bg">{number}</span>
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
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
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
    <div className="min-h-screen bg-bg text-[#FFFFFF] selection:bg-accent selection:text-bg font-sans">

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
                <span className="rounded-full bg-accent/20 px-4 py-2 text-xs md:text-sm font-bold text-accent ring-1 ring-inset ring-accent/30 uppercase tracking-widest backdrop-blur-sm">
                   La mejor elección de carbón
                </span>
              </div>

              {/* Título: Ajustado para Móvil (text-4xl) */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-none">
                Carbón que
                <br />
                <span className="text-accent italic">sabe a tradición</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
                Principalmente Mezquite y Ébano. Hecho a mano en <span className="text-gold font-bold">Tamaulipas</span>,
                el segundo estado productor de carbón del país — donde la carne asada es religión.
              </p>

              {/* Stats: Espacio reducido en móvil (gap-4) */}
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <div className="text-3xl font-black text-accent mb-1">3ra</div>
                  <div className="text-gray-400 uppercase text-xs tracking-wider">Generación</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gold mb-1">3hrs+</div>
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
          <div className="hidden lg:block absolute right-[-60px] top-1/2 -translate-y-1/2 w-[360px] h-[440px] z-10 animate-fade-in">
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
        <section className="relative min-h-screen overflow-hidden scroll-reveal-fast bg-bg scroll-reveal">
          {/* Fondo Ambiental: Resplandor de brasas */}
          <div className="absolute inset-0 bg-linear-to-br from-danger/20 via-bg to-accent/10"></div>

          {/* Decoración de fondo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -z-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="text-center">

              <div className="mb-8 flex justify-center">
                <span className="rounded-full bg-accent/10 px-4 py-1 text-sm font-bold leading-6 text-accent ring-1 ring-inset ring-accent/20 uppercase tracking-widest flex items-center gap-2">
                  <Flame className="text-lg"/> La mejor elección para tu asador
                </span>
              </div>

              {/* Título: Promesa de Valor para Negocio */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white uppercase tracking-tight">
                Potencia el sabor de <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-gold to-accent">
                  tu negocio
                </span>
              </h1>

              {/* Título: Enfocado en el sabor y la tradición 
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-linear-to-r from-accent via-gold to-accent bg-clip-text text-transparent animate-fade-in drop-shadow-sm uppercase tracking-tight">
                Elaborado con pasión y dedicación en cada bolsa. Tradición y amor.
              </h2>
              */}

              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-light">
                Carbón de Mezquite y Ébano seleccionado para <span className="text-accent font-bold"> alto rendimiento. 
                Abastecimiento constante </span> para restaurantes, cadenas y distribuidores mayoristas.
              </p>

              {/* Botones de Venta */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/interest"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-4 font-bold text-lg transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] transform hover:scale-105 flex items-center gap-2 uppercase tracking-wide"
                >
                  Cotizar Mayoreo
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/productos"
                  className="bg-transparent border-2 border-white/20 text-white/90 hover:border-gold hover:text-gold px-8 py-4 font-bold text-lg transition-all duration-300 rounded-full flex items-center gap-2 backdrop-blur-sm"
                >
                  Ver Catálogo
                </Link>
              </div>

              {/* DATOS DEL CARBÓN (Los Modals Actualizados) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

                {/* Dato 1: Origen Tamaulipas */}
                <div className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors duration-300">
                  {/* Icono Mapa */}
                  <MapPin className="w-10 h-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-2">De Tamaulipas</div>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    Nacido en las tierras del norte, donde la carne asada es religión. Traemos lo mejor de la región directo a tu asador.
                  </p>
                </div>

                {/* Dato 2: Ébano y Mezquite */}
                <div className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-gold/50 transition-colors duration-300">
                  {/* Icono Fuego/Madera */}
                  <Flame className="w-10 h-10 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-2">Ébano y Mezquite</div>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    La mezcla premium: <span className="text-gold">Ébano</span> para una brasa ardiente que dura horas y <span className="text-accent">Mezquite</span> para ese ahumado único.
                  </p>
                </div>

                {/* Dato 3: Hecho a Mano */}
                <div className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-danger/50 transition-colors duration-300">
                  {/* Icono Martillo/Trabajo Manual */}
                  <Hammer className="w-10 h-10 text-danger mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-extrabold text-white mb-2">Principalmente Artesanal</div>
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
          <div className="absolute inset-0 bg-bg">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="wood"><feTurbulence baseFrequency="0.05" numOctaves="8" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100" height="100" filter="url(%23wood)"/></svg>')`
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest ring-1 ring-inset ring-accent/20">
                Calidad Garantizada
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tight">
                Garantía <span className="text-accent">El Ranchero</span>
              </h2>
              <p className="text-gray-400 text-xl">Lo que dice la bolsa, lo cumple la brasa</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: 'Calidad Premium', desc: 'Trozos grandes, cero polvo', color: 'var(--c-gold)', image: '/carbon-prendidp.jpg' },
                { icon: Truck, title: 'Entrega Rápida', desc: 'Directo a tu puerta, sin esperas eternas', color: 'var(--c-accent)', image: '/torre.jpg' },
                { icon: Leaf, title: 'Principalmente Natural', desc: 'Sin químicos, sabor auténtico', color: 'var(--c-danger)', image: '/bolsas.jpg' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="cursor-pointer group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-accent transition-all">
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
        <section className="py-20  bg-linear-to-br from-danger/20 via-bg to-accent/10 scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                ¿Por qué los <span className="text-accent">expertos</span> nos eligen?
              </h2>
              <p className="text-gray-400 text-xl">No es solo fuego, es el ingrediente secreto</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: ChefHat, title: 'Perfil de Sabor Único', desc: 'El mezquite aporta notas ahumadas auténticas que elevan tus cortes', color: 'var(--c-accent)' },
                { icon: DollarSign, title: 'Rentabilidad por Costal', desc: 'Rinde hasta 30% más que carbones comerciales', color: 'var(--c-gold)' },
                { icon: Flame, title: 'Temperatura Constante', desc: 'Brasa estable para control total de cocción', color: 'var(--c-danger)' },
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

        <section className="py-10 bg-linear-to-b from-[#0f0f0f] to-bg  scroll-reveal">
          {/* Fondo con textura de madera */}
          <div className="absolute inset-0 bg-bg">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="wood"><feTurbulence baseFrequency="0.05" numOctaves="8" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100" height="100" filter="url(%23wood)"/></svg>')`
            }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                Lo Más <span className="text-accent">Vendido</span>
              </h2>
              <p className="text-gray-400 text-lg">El carbón que eligen los profesionales</p>
            </div>

            {/* Card grande estilo featured */}
            <div className="group relative block w-full h-auto min-h-[450px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(253,106,2,0.3)] transition-all duration-500 cursor-pointer">
              {/* Imagen de fondo */}
              <div className="absolute inset-0 bg-surface-raised group-hover:scale-105 transition-transform duration-700">
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
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-xs md:text-sm font-black uppercase tracking-widest mb-6 shadow-lg shadow-accent/30 border border-white/10">
                        Calidad de Exportación
                    </span>

                    {/* Título Principal */}
                    <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-none group-hover:text-accent transition-colors uppercase tracking-tight">
                        Carbón El Ranchero
                        <br />
                        <span className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-gold to-accent">
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
                    <Flame className="w-5 h-5 text-accent" />
                    Enciende en 10 minutos
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-5 h-5 text-accent" />
                    Dura 3+ horas
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="w-5 h-5 text-gold" />
                    Calidad Premium
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de productos secundarios */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { name: 'Costal 20kg', image: '/costales.jpg', tag: 'Restaurantes' },
                { name: 'Bolsa 4kg', image: '/bolsas-ranchero.jpg', tag: 'Uso Rudo' },
                { name: 'Briquetas', image: '/briqueta-alm.jpg', tag: 'Profesional' },
              ].map((product, i) => (
                <div key={i} className="group relative h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all cursor-pointer">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase mb-2">
                      {product.tag}
                    </span>
                    <h4 className="text-2xl font-black text-white group-hover:text-accent transition-colors">
                      {product.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto from-bg to-[#0f0f0f] scroll-reveal">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* COLUMNA IZQUIERDA: El Manifiesto (Texto con actitud) */}
            <div>
              <span className="text-accent font-black tracking-widest text-xs uppercase mb-4 block">
                Nuestra Filosofía
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-none tracking-tight">
                Tres promesas que <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-danger">
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
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                      <Flame className="w-5 h-5 text-accent" />
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
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
                      <Scale className="w-5 h-5 text-gold" />
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
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Entrega Rápida</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Pides hoy, cocinas pronto. Coordinamos la entrega directo a tu negocio sin que se te apague la parrilla esperando.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* COLUMNA DERECHA: Datos Duros (Visual más técnico/B2B) */}
            <div className="relative">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-linear-to-tr from-accent/20 via-transparent to-transparent rounded-3xl blur-2xl -z-10"></div>

              <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
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
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(253,106,2,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Facturación</span>
                    <span className="text-accent font-bold text-sm bg-accent/10 px-3 py-1 rounded-full border border-accent/20">Automática</span>
                  </li>

                  {/* Item 2 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-gold/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Permisos SEMARNAT</span>
                    <span className="text-gold font-bold text-sm bg-gold/10 px-3 py-1 rounded-full border border-gold/20">Vigentes</span>
                  </li>

                  {/* Item 3 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Empaque</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">Uso Rudo (3 Capas)</span>
                  </li>

                  {/* Item 4 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(253,106,2,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Envíos</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">CDMX y Edo. Mex</span>
                  </li>

                  {/* Item 5 */}
                  <li className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-gold/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:-translate-y-1 cursor-default">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Norma Forestal</span>
                    <span className="text-gold font-bold text-sm bg-gold/10 px-3 py-1 rounded-full border border-gold/20">NOM-152-SEMARNAT</span>
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
        <section className="relative py-12 px-4 md:px-6 bg-linear-to-b from-bg via-surface to-bg border-y border-white/5 overflow-hidden scroll-reveal">

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
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-accent/10 via-bg to-bg border border-accent/30 p-8 md:p-10 transition-all duration-500 group hover:border-accent hover:shadow-[0_0_60px_rgba(253,106,2,0.15)] hover:-translate-y-2 hover:scale-[1.02]">
                
                {/* Luz de fondo que se intensifica al hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-colors duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    {/* Icono más grande y con fondo */}
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ChefHat className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic text-white group-hover:text-accent transition-colors">
                        Restaurantes
                    </h3>
                  </div>

                  <ul className="space-y-5 mb-10">
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0 shadow-[0_0_10px_var(--c-accent)]"></div>
                      <span className="text-gray-300 text-lg">Calidad estandarizada en cada pedido</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0 shadow-[0_0_10px_var(--c-accent)]"></div>
                      <span className="text-gray-300 text-lg">Facturación mensual disponible</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0 shadow-[0_0_10px_var(--c-accent)]"></div>
                      <span className="text-gray-300 text-lg">Entrega rápida, directo a tu puerta</span>
                    </li>
                  </ul>

                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Entrega</p>
                        <p className="text-3xl font-black text-white group-hover:text-accent transition-colors">Rápida<span className="text-lg text-gray-500 font-medium"> y directa</span></p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Distribuidores */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gold/10 via-bg to-bg border border-gold/30 p-8 md:p-10 transition-all duration-500 group hover:border-gold hover:shadow-[0_0_60px_rgba(255,215,0,0.15)] hover:-translate-y-2 hover:scale-[1.02]">
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full group-hover:bg-gold/20 transition-colors duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ShoppingCart className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic text-white group-hover:text-gold transition-colors">
                        Distribuidores
                    </h3>
                  </div>

                  <ul className="space-y-5 mb-10">
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0 shadow-[0_0_10px_var(--c-gold)]"></div>
                      <span className="text-gray-300 text-lg">Empaque con presentación premium</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0 shadow-[0_0_10px_var(--c-gold)]"></div>
                      <span className="text-gray-300 text-lg">Márgenes competitivos para reventa</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0 shadow-[0_0_10px_var(--c-gold)]"></div>
                      <span className="text-gray-300 text-lg">Entrega rápida a tu bodega</span>
                    </li>
                  </ul>

                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Entrega</p>
                        <p className="text-3xl font-black text-white group-hover:text-gold transition-colors">Rápida<span className="text-lg text-gray-500 font-medium"> y directa</span></p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link // Usamos Link si es navegación interna, o button si abre modal
                href="/interest"
                className="bg-accent text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(253,106,2,0.4)] hover:shadow-[0_0_30px_rgba(253,106,2,0.6)] hover:-translate-y-1 inline-flex items-center justify-center gap-2 group uppercase tracking-wide text-center"
              >
                Solicitar cotización
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 scroll-reveal bg-bg scroll-reveal">
          {/* Títulos */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white uppercase tracking-tight">
              Así Nos <span className="text-accent">Abastecemos</span>
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
              className="group bg-accent hover:bg-accent-hover px-6 py-3.5 md:px-10 md:py-5 font-bold text-base md:text-xl text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(253,106,2,0.4)] hover:shadow-[0_0_25px_rgba(253,106,2,0.6)] transform hover:scale-105 inline-flex items-center justify-center gap-3 uppercase tracking-wider text-center"
            >
              Cotizar Mayoreo
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
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
            <div className="inline-flex p-6 rounded-full bg-linear-to-br from-accent to-danger mb-8 shadow-[0_0_40px_rgba(253,106,2,0.6)] animate-pulse-slow">
              <Flame className="w-20 h-20 text-white" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase leading-tight">
              ¿Listo para llevar tu parrilla
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-gold">
                al siguiente nivel?
              </span>
            </h2>

            <p className="text-2xl text-gray-300 mb-12 font-light">
              No arriesgues tu operación con carbón de mala calidad. <br className="hidden md:block" />
              <strong className="text-white">Asegura el abasto, rendimiento y sabor</strong> que tu negocio merece.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={"/interest"}
              className="cursor-pointer group bg-accent hover:bg-accent-hover px-8 py-4 md:px-12 md:py-6 font-black text-lg md:text-2xl text-white transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(253,106,2,0.5)] hover:shadow-[0_0_50px_rgba(253,106,2,0.7)] transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 uppercase tracking-wider text-center">
                Solicitar Alta
                <ArrowRight className="w-5 h-5 md:w-7 md:h-7 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={"/productos"} className="cursor-pointer group bg-transparent border-2 border-white/30 hover:border-gold text-white hover:text-gold px-8 py-4 md:px-12 md:py-6 font-bold text-lg md:text-2xl transition-all duration-300 rounded-full inline-flex items-center justify-center gap-3 backdrop-blur-sm text-center">
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
      <Footer />

      {/* Modals */}

      {/* 1. Modal de Seguridad (Antes Disclaimer) */}
      <Modal isOpen={showDisclaimerModal} onClose={() => setShowDisclaimerModal(false)} maxWidth="max-w-4xl">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-warning uppercase">Seguridad y Precaución</h3>
            <button
              onClick={() => setShowDisclaimerModal(false)}
              className="text-gray-400 cursor-pointer hover:text-white text-2xl leading-none transition-colors p-2 -m-2"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Tarjeta de Peligro Mortal */}
              <div className="bg-danger/10 border border-danger/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TriangleAlert className="w-5 h-5 text-danger" />
                  <h4 className="font-bold text-danger uppercase">Peligro Mortal</h4>
                </div>
                <ul className="text-xs space-y-2 text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-danger font-bold">•</span>
                    <span>NUNCA usar en interiores (casas, tiendas de campaña, vehículos).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-danger font-bold">•</span>
                    <span>El Monóxido de Carbono es invisible, inodoro y letal.</span>
                  </li>
                </ul>
              </div>

              {/* Tarjeta de Manejo de Fuego */}
              <div className="bg-accent/10 border border-accent/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-accent" />
                  <h4 className="font-bold text-accent uppercase">Manejo del Fuego</h4>
                </div>
                <ul className="text-xs space-y-2 text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>El carbón puede lanzar chispas. Mantener distancia.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Asegúrese de apagar completamente las brasas con agua o arena.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg text-xs leading-relaxed border-l-4 border-warning">
              <strong className="text-warning block mb-1">RESPONSABILIDAD DEL USUARIO:</strong>
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
              className="bg-accent hover:bg-accent-hover text-white font-bold cursor-pointer px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-xs"
            >
              He leído y comprendo los riesgos
            </button>
          </div>
        </Modal>

      {/* 3. Modal de Contacto */}
      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} maxWidth="max-w-lg">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black text-accent uppercase">Hablemos de Carbón</h3>
            <button
              onClick={() => setShowContactModal(false)}
              className="text-gray-400 cursor-pointer hover:text-white text-2xl leading-none p-2 -m-2"
            >
              ×
            </button>
          </div>
          <div className="space-y-6 text-sm text-gray-300">
            <p className="text-center text-gray-400">¿Tienes dudas sobre tu pedido o quieres ser distribuidor?</p>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <Phone className="font-bold" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Teléfonos</p>
                        <p className="text-white font-bold text-lg">(55) 5576 0890</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
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
              className="bg-accent hover:bg-accent-hover text-white font-bold cursor-pointer px-6 py-2 rounded-full transition-colors"
            >
              Entendido
            </button>
          </div>
        </Modal>

    </div>
  );
}