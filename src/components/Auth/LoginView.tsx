"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Clock, Watch, Timer, Hourglass } from 'lucide-react';
import { login } from '@/src/services/authServices';

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await login(username, password);
      console.log('Login Sukses:', response);
      // TODO: Redirect ke halaman Admin/Dashboard misal pake router.push('/admin/dashboard')
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f2ec] font-sans relative overflow-hidden px-4">
      
      {/* Background Ornaments (Ornamen Jam) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <Clock size={160} strokeWidth={1} className="absolute top-[10%] left-[15%] text-[#8e6648]/5 -rotate-12" />
        <Watch size={120} strokeWidth={1} className="absolute top-[20%] right-[15%] text-[#8e6648]/5 rotate-12" />
        <Timer size={140} strokeWidth={1} className="absolute bottom-[15%] left-[20%] text-[#8e6648]/5 -rotate-6" />
        <Hourglass size={180} strokeWidth={1} className="absolute bottom-[10%] right-[20%] text-[#8e6648]/5 rotate-12" />
        <Clock size={80} strokeWidth={1} className="absolute top-[40%] left-[5%] text-[#8e6648]/5 rotate-45" />
        <Watch size={90} strokeWidth={1} className="absolute top-[50%] right-[5%] text-[#8e6648]/5 -rotate-45" />
      </div>

      {/* Card Login */}
      <div className="w-full max-w-md bg-white p-10 sm:p-12 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(142,102,72,0.1)] relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Selamat Datang
          </h1>
          <p className="text-sm font-medium text-stone-500">
            Silakan masuk ke Admin Panel Zendeco
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        {/* Form Elements */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8e6648] block">Username</label>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ketik username admin..."
                // Tambahin text-[#8e6648] dan font-semibold di bawah ini
                className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:border-[#8e6648] focus:ring-1 focus:ring-[#8e6648] transition-all text-sm text-[#8e6648] font-semibold bg-stone-50 focus:bg-white placeholder:text-stone-400 font-normal"
                required
                disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-bold text-[#8e6648] block">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                // Tambahin text-[#8e6648] dan font-semibold di bawah ini
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:border-[#8e6648] focus:ring-1 focus:ring-[#8e6648] transition-all text-sm text-[#8e6648] font-semibold bg-stone-50 focus:bg-white placeholder:text-stone-400 font-normal"
                required
                disabled={isLoading}
                />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#8e6648] transition-colors focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#8e6648] text-white py-4 rounded-2xl font-bold shadow-md hover:bg-[#7a563b] transition-all duration-300 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "MASUK SEKARANG"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-stone-500 text-xs font-medium">
            Bukan admin?{' '}
            <Link href="/" className="text-[#8e6648] font-bold hover:underline transition-all">
              Kembali ke Beranda
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}