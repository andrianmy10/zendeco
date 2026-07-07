"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Pake Link biar pindah halaman gak reload
import { usePathname } from 'next/navigation'; // Buat deteksi URL sekarang
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Dapetin URL sekarang (misal: "/" atau "/produk")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },       // Ubah href jadi path root
    { name: 'Products', href: '/produk' }, // Ubah href jadi path produk
    { name: 'About Us', href: '/#tentang' },
    { name: 'Reviews', href: '/#ulasan' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 pt-6 pb-4 transition-colors duration-300 ${
        isScrolled ? 'bg-[#8e6548] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer z-50">
          <div
            className={`w-8 h-8 flex items-center justify-center border-2 rounded-sm rotate-45 transition-colors duration-300 ${
              isScrolled ? 'border-white' : 'border-[#c08457]'
            }`}
          >
            <span className={`font-bold text-lg -rotate-45 transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#c08457]'}`}>
              Z
            </span>
          </div>
          <span className={`font-bold text-xl tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-stone-900'}`}>
            ZENDECO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => {
            // Logika buat nentuin menu mana yang aktif
            const isActive = pathname === link.href || (link.href.includes('#') && pathname === '/');
            
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-semibold transition-colors duration-300 relative group ${
                  isScrolled
                    ? isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    : isActive ? 'text-[#c08457]' : 'text-stone-600 hover:text-[#c08457]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className={`absolute -bottom-2 left-0 w-full h-[2px] transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-[#c08457]'}`}></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <Link 
            href="/produk"
            className={`hidden md:flex px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 shadow-md ${
              isScrolled ? 'bg-white text-[#8e6548] hover:bg-stone-100' : 'bg-[#c08457] text-white hover:bg-stone-800'
            }`}
          >
            Pesan Sekarang
          </Link>
          
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
             {/* Animasi Hamburger Button tetep sama, cuma styling warna yg di sesuaikan */}
             <span className={`absolute w-6 h-[2px] rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 bg-stone-800' : isScrolled ? '-translate-y-[6px] bg-white' : '-translate-y-[6px] bg-stone-900'}`}></span>
             <span className={`absolute w-6 h-[2px] rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : isScrolled ? 'opacity-100 bg-white' : 'opacity-100 bg-stone-900'}`}></span>
             <span className={`absolute w-6 h-[2px] rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 bg-stone-800' : isScrolled ? 'translate-y-[6px] bg-white' : 'translate-y-[6px] bg-stone-900'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-[#fdfbf9] transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="relative h-full flex flex-col justify-center px-10">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-900 text-4xl font-extrabold py-3 border-b border-stone-200 transition-all hover:text-[#c08457]"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}