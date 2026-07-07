"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, MessageSquare, Box, Settings, LogOut, X, ListChecks
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Kelola Pesanan', icon: ShoppingBag, href: '/admin/pesanan' },
    { name: 'Kelola Kategori', icon: ListChecks, href: '/admin/kategori' },
    { name: 'Kelola Produk', icon: Box, href: '/admin/produk' },
    { name: 'Kelola Ulasan', icon: MessageSquare, href: '/admin/ulasan' },
    { name: 'Pengaturan', icon: Settings, href: '/admin/pengaturan' },
  ];

  return (
    <aside 
      className={`w-64 bg-white border-r border-stone-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      
      <div className="h-24 relative flex items-center justify-center shrink-0">
        <Image 
          src="/assets/img/logo.png" 
          alt="Zendeco Logo" 
          width={180} 
          height={80} 
          className="w-auto h-12 object-contain"
          priority
        />
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-6 lg:hidden text-stone-400 hover:text-stone-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
        <div className="text-[10px] font-bold text-[#B08D63] mb-4 px-4 tracking-[0.2em] uppercase">
          Main Menu
        </div>
        
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                isActive 
                  ? 'bg-[#2F4638] text-white shadow-md shadow-[#2F4638]/20' 
                  : 'text-stone-500 hover:bg-[#F1EFE7] hover:text-[#2F4638]'
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Tombol Logout */}
      <div className="p-4 border-t border-stone-200 bg-white shrink-0">
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 w-full rounded-lg font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-300 text-sm">
          <LogOut size={16} strokeWidth={2.5} />
          Keluar
        </button>
      </div>
      
    </aside>
  );
}