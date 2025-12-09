'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
// Asegúrate de tener configurada tu variable de entorno o config
// import { API_URL } from '@/lib/config'; 
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''; // Fallback temporal

import { User, Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Login() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState(''); // Cambié 'email' por 'identifier' (puede ser ID o Email)
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isFirstTime, setIsFirstTime] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!identifier || !password) {
      setError('Por favor, ingresa tus credenciales.');
      setIsLoading(false);
      return;
    }

    try {
      // Ajusta la ruta de tu API según corresponda
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          identifier: identifier, // Enviamos 'identifier' en lugar de solo 'email'
          password: password,
        }),
      });

      if (res.ok) {
        console.log('Login exitoso!');
        router.push('/dashboard'); // Redirigir al Dashboard de Pedidos
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Credenciales incorrectas. Verifica tu ID/Correo.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión. Intenta más tarde.');
      setIsLoading(false);
    }
  };

  return (
    // FONDO: Usamos el mismo estilo "Brasas" de la Landing Page
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#FD6A02] selection:text-white">
      
      {/* Luces de fondo (Atmosfera) */}
      <div className="absolute inset-0 bg-linear-to-br from-[#D32F2F]/10 via-[#0A0A0A] to-[#0A0A0A]"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto relative z-10">
        
        {/* LOGO SUPERIOR */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
             <div className="mx-auto h-16 w-16 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(253,106,2,0.4)] mb-4 group-hover:scale-105 transition-transform">
                <img 
                  src="/logo.png" 
                  alt="Logo El Ranchero" 
                  className="w-full h-full object-contain" 
                />
             </div>
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">
               Acceso <span className="text-[#FD6A02]">Socios</span>
             </h2>
             <p className="mt-2 text-sm text-gray-400">
               Portal de pedidos y facturación
             </p>
          </Link>
        </div>

        {/* CAJA DEL FORMULARIO */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* CAMPO 1: ID O CORREO */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                ID de Cliente o Correo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Ej. RAN-2025 o correo@empresa.com"
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] transition-colors sm:text-sm"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* CAMPO 2: CONTRASEÑA */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-lg leading-5 bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] transition-colors sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* RECORDAR Y OLVIDÉ */}
            <div className="flex items-center justify-between">

              <div className="text-sm">
                <Link href="/recover" className="font-medium text-[#FD6A02] hover:text-[#FFD700] transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* MENSAJE DE ERROR */}
            {error && (
              <div className="rounded-lg bg-[#D32F2F]/10 border border-[#D32F2F]/30 p-3">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-[#D32F2F]">Error de acceso</h3>
                    <div className="mt-1 text-sm text-[#D32F2F]/80">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOTÓN DE LOGIN */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-[#FD6A02]/20 text-sm font-bold text-white bg-[#FD6A02] hover:bg-[#e55a00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6A02] focus:ring-offset-[#0A0A0A] transition-all transform hover:scale-[1.02] uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validando...
                  </span>
                ) : (
                  'Ingresar al Panel'
                )}
              </button>
            </div>
          </form>

          {/* SECCIÓN "NO TENGO CUENTA" */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#111] text-gray-500">¿Eres nuevo distribuidor?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
               <p className="text-gray-400 text-sm mb-4">
                 El acceso es exclusivo para socios verificados.
               </p>

               <div className="mt-6 grid grid-cols-1 gap-3">
                 <button
                   onClick={() => setIsFirstTime(!isFirstTime)}
                   className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-300 bg-transparent hover:bg-white/5 transition-colors cursor-pointer"
                 >
                   <ShieldCheck className="h-5 w-5 text-[#FD6A02] mr-2" />
                   <span>Activar mi cuenta con ID Temporal</span>
                 </button>
               </div>

               {/* Nota de soporte */}
               <p className="mt-6 text-center text-xs text-gray-500">
                 ¿Problemas para acceder? Contacta a soporte <br/>
                 <a href="tel:+525555760890" className="text-gray-400 font-bold hover:text-[#FD6A02] transition-colors">elranchero@gmail.com</a>
               </p>
            </div>
          </div>

        </div>

        {/* VOLVER AL INICIO */}
        <div className="mt-8 text-center">
           <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#FD6A02] transition-colors text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a la página principal
           </Link>
        </div>

      </div>

      {/* --- MODAL DE PRIMER ACCESO --- */}
      {isFirstTime && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="bg-[#111] border border-[#FD6A02]/30 p-8 rounded-2xl max-w-md w-full shadow-2xl animate-fade-in-up">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#FD6A02]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-6 h-6 text-[#FD6A02]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Configura tu Acceso</h3>
                    <p className="text-sm text-gray-400">
                        Por seguridad, vincula un correo y actualiza tu contraseña para dejar de usar la temporal.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {/* Aquí iría la lógica para actualizar usuario en tu DB */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nuevo Correo de Acceso</label>
                        <div className="relative">
                             <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                             <input type="email" className="w-full bg-black border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] focus:outline-none" placeholder="tu@correo.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nueva Contraseña</label>
                        <div className="relative">
                             <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                             <input type="password" className="w-full bg-black border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] focus:outline-none" placeholder="Nueva contraseña segura" />
                        </div>
                    </div>
                    <button className="w-full bg-[#FD6A02] hover:bg-[#e55a00] text-white font-bold py-3 rounded-lg transition-colors mt-2 cursor-pointer">
                        Guardar y Acceder
                    </button>
                    <button onClick={() => setIsFirstTime(false)} className="w-full text-gray-500 text-sm py-2 hover:text-white transition-colors cursor-pointer">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}