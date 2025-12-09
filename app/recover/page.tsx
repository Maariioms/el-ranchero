'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, KeyRound, ArrowRight, Loader2, ArrowLeft, CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';

export default function RecoverPass() {
  const router = useRouter();
  const [step, setStep] = useState(1); 

  // Estados
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- MOCK: SIMULAR ENVÍO DE CÓDIGO ---
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        if(!email.includes('@')) {
            setError('Ingresa un correo válido (ej. test@test.com)');
            return;
        }
        
        setSuccessMsg('Código enviado a ' + email);
        
        setTimeout(() => {
            setSuccessMsg('');
            setStep(2);
        }, 1500);
    }, 1500);
  };

  // --- MOCK: SIMULAR CAMBIO DE PASS ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        
        if(code !== '123456') {
            setError('Código incorrecto. Prueba con 123456');
            return;
        }

        setSuccessMsg('¡Contraseña actualizada con éxito!');
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#FD6A02] selection:text-white">
      
      {/* Luces de fondo */}
      <div className="absolute inset-0 bg-linear-to-br from-[#D32F2F]/10 via-[#0A0A0A] to-[#0A0A0A]"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FD6A02]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto relative z-10">
        
        {/* LOGO SUPERIOR */}
        <div className="text-center mb-8">
           <div className="mx-auto h-16 w-16 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(253,106,2,0.4)] mb-4">
                <KeyRound className="h-8 w-8 text-[#FD6A02]" />
           </div>
           <h2 className="text-3xl font-black text-white uppercase tracking-tight">
             Recuperar <span className="text-[#FD6A02]">Acceso</span>
           </h2>
           <p className="mt-2 text-sm text-gray-400">
             {step === 1 ? 'Ingresa tu correo para recibir un código' : 'Define tu nueva contraseña'}
           </p>
        </div>

        {/* CAJA DEL FORMULARIO */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          
          {/* --- PASO 1: SOLICITAR CÓDIGO --- */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendCode}>
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  Correo registrado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@empresa.com"
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-linear-to-r from-[#FD6A02] to-[#D32F2F] hover:from-[#e55a00] hover:to-[#c62828] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6A02] focus:ring-offset-[#0A0A0A] disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] uppercase tracking-wide shadow-lg shadow-[#FD6A02]/20"
              >
                 {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Procesando...
                  </span>
                 ) : (
                  <span className="flex items-center gap-2">
                    Enviar Código <ArrowRight className="h-4 w-4" />
                  </span>
                 )}
              </button>

              <div className="pt-4 border-t border-white/5">
                <p className="text-center text-xs text-gray-500 mb-3">
                    ¿Perdiste acceso a tu correo electrónico?
                </p>
                <a 
                    href="https://wa.me/525555555555" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center py-2 px-4 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                    <HelpCircle className="w-4 h-4 mr-2 text-[#FD6A02]" />
                    Contactar Soporte Manual
                </a>
              </div>
            </form>
          )}

          {/* --- PASO 2: INGRESAR CÓDIGO --- */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                    Código de Verificación
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Ej. 123456"
                      className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors tracking-[0.5em] font-mono text-center"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-lg bg-[#0A0A0A] text-white placeholder-gray-600 focus:outline-none focus:border-[#FD6A02] focus:ring-1 focus:ring-[#FD6A02] text-sm transition-colors"
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-linear-to-r from-[#FD6A02] to-[#D32F2F] hover:from-[#e55a00] hover:to-[#c62828] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6A02] focus:ring-offset-[#0A0A0A] disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] uppercase tracking-wide shadow-lg shadow-[#FD6A02]/20"
                >
                   {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" /> Actualizando...
                    </span>
                   ) : (
                    'Restablecer Contraseña'
                   )}
                </button>
                
                <div className="text-center mt-2">
                    <button 
                        type="button"
                        onClick={() => { setStep(1); setError(''); setCode(''); }}
                        className="text-xs text-gray-500 hover:text-[#FD6A02] transition-colors cursor-pointer"
                    >
                        ¿Código incorrecto? Reenviar
                    </button>
                </div>
            </form>
          )}

          {/* MENSAJE ERROR (ROJO BRILLANTE) */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-900/20 border border-red-500/50 p-3 flex items-start animate-fade-in-up">
               <AlertCircle className="h-5 w-5 text-red-400 mr-2 shrink-0" />
               <div className="text-sm text-red-400 font-medium">{error}</div>
            </div>
          )}
          
          {/* MENSAJE EXITO (VERDE BRILLANTE) */}
          {successMsg && (
             <div className="mt-4 rounded-lg bg-green-900/20 border border-green-500/50 p-3 flex items-center animate-fade-in-up">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                <div className="text-sm text-green-400 font-medium">{successMsg}</div>
             </div>
          )}

        </div>

        {/* VOLVER AL LOGIN */}
        <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center text-gray-500 hover:text-[#FD6A02] transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio de sesión
            </Link>
        </div>

      </div>
    </div>
  );
}