
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wallet, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'dashboard' | 'market' | 'portfolio' | 'academia' | 'leaderboard' | 'trade';
}

const pageConfig = {
  home: {
    title: 'CryptoSim-Lab',
    subtitle: '¡Has vuelto!',
    color: 'text-blue-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]'
  },
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Analiza tu portfolio de criptomonedas',
    color: 'text-amber-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(251,191,36,0.7)]'
  },
  market: {
    title: 'Mercado',
    subtitle: 'Trading en Vivo',
    color: 'text-purple-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]'
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'Gestiona tus inversiones',
    color: 'text-purple-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]'
  },
  academia: {
    title: 'Academia CryptoSim',
    subtitle: 'Aprende trading y gana badges',
    color: 'text-blue-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]'
  },
  leaderboard: {
    title: 'Leaderboard',
    subtitle: '¡Compite contra otros traders!',
    color: 'text-yellow-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]'
  },
  trade: {
    title: 'Trade',
    subtitle: 'Compra y vende criptomonedas',
    color: 'text-pink-400',
    shadow: 'drop-shadow-[0_0_15px_rgba(244,114,182,0.7)]'
  }
};

export default function Navbar({ currentPage }: NavbarProps) {
  const router = useRouter();
  const [userName, setUserName] = useState('...');
  const [balance, setBalance] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = pageConfig[currentPage];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });

      if (!res.ok) {
        router.push('/login');
        return;
      }

      const data = await res.json();

      // Extraer solo el primer nombre
      const fullName = data.user.name;
      const firstName = fullName.split(' ')[0];

      setUserName(firstName);
      setBalance(data.user.balance || 0);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error al llamar a la API de logout:', error);
    } finally {
      router.push('/');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
        <div className="flex justify-between items-center gap-2 sm:gap-4 md:gap-8">
          {/* Título y subtítulo */}
          <div className="min-w-0 shrink">
            <h1 className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-bold ${config.color} ${config.shadow} truncate`}>
              {config.title}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block truncate">{config.subtitle}</p>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex gap-5">
            <Link
              href="/home"
              className={`font-medium transition ${currentPage === 'home' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`font-medium transition ${currentPage === 'dashboard' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Dashboard
            </Link>
            <Link
              href="/academia"
              className={`font-medium transition ${currentPage === 'academia' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Academia
            </Link>
            <Link
              href="/portfolio"
              className={`font-medium transition ${currentPage === 'portfolio' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Portfolio
            </Link>
            <Link
              href="/market"
              className={`font-medium transition ${currentPage === 'market' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Mercado
            </Link>
            <Link
              href="/leaderboard"
              className={`font-medium transition ${currentPage === 'leaderboard' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Leaderboard
            </Link>
            <Link
              href="/trade"
              className={`font-medium transition ${currentPage === 'trade' ? config.color : 'text-gray-300 hover:text-blue-400'}`}
            >
              Trade
            </Link>
          </nav>

          {/* Botón Hamburguesa (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white transition flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Usuario y balance */}
          <div className="text-right min-w-0 flex-shrink">
            <p className={`text-xs sm:text-sm font-bold ${config.color} ${config.shadow} truncate max-w-[80px] sm:max-w-none`}>
              {userName}
            </p>
            <p className="text-green-400 font-bold text-xs sm:text-sm md:text-base flex items-center justify-end gap-1 whitespace-nowrap">
              <Wallet className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:inline flex-shrink-0" />
              <span className="truncate">{formatCurrency(balance)}</span>
            </p>
          </div>

          {/* Botón logout */}
          <LogOut
            onClick={handleLogout}
            className="w-5 h-5 sm:w-6 sm:h-6 text-red-700 hover:text-red-800 cursor-pointer transition-colors duration-300 shadow-lg hover:scale-110 flex-shrink-0"
          />
        </div>

        {/* Menú Mobile Desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 mt-3 pt-3 pb-2 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              <Link
                href="/home"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'home'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'dashboard'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/academia"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'academia'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Academia
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'portfolio'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/market"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'market'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Mercado
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'leaderboard'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Leaderboard
              </Link>
              <Link
                href="/trade"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  currentPage === 'trade'
                    ? `${config.color} bg-gray-700/50`
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30'
                }`}
              >
                Trade
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
