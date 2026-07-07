"use client";

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  // Bikin state default sebelum data session ke-load
  const [user, setUser] = useState({
    fullname: 'Memuat...',
    role: 'Admin',
    initial: 'A'
  });

  // Tarik data session pas komponen di-render
  useEffect(() => {
    const storedUser = localStorage.getItem('userSession');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        fullname: parsedUser.fullname || 'Admin',
        // Rapihin format role dari 'SUPER_ADMIN' jadi 'Super Admin'
        role: parsedUser.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin',
        // Ambil huruf pertama buat inisial avatar
        initial: parsedUser.fullname ? parsedUser.fullname.charAt(0).toUpperCase() : 'A'
      });
    }
  }, []);

  return (
    <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
      
      {/* Kiri: Hamburger Button */}
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-[#2F4638] hover:text-[#B08D63] transition-colors p-2 -ml-2"
        >
          <Menu size={26} strokeWidth={2.5} />
        </button>
      </div>

      {/* Kanan: Profil Admin Dinamis */}
      <div className="flex items-center gap-4 cursor-pointer group ml-auto">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-extrabold text-[#2F4638] group-hover:text-[#B08D63] transition-colors">
            {user.fullname}
          </p>
          <p className="text-xs font-semibold text-[#B08D63]">
            {user.role}
          </p>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-[#2F4638] text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-300">
          {user.initial}
        </div>
      </div>
        
    </header>
  );
}