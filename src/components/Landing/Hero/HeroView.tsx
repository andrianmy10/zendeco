import Image from 'next/image';
import { ArrowRight, MessageCircle, MapPin, Clock, CheckCircle, Sparkles } from 'lucide-react';

export default function HeroView() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#ffffff] pb-16 sm:pb-0">
      
      {/* Background Image dengan efek fade to white di bawah */}
      <div className="absolute inset-0 w-full h-full">
        <Image
            src="/assets/img/hero.png"
            alt="Zen Decoration Background"
            fill
            priority
            className="object-cover object-center opacity-60 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff]/10 via-[#ffffff]/40 to-[#ffffff]"></div>
      </div>

      {/* Konten Utama (Centered) */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-3xl mt-24">
        
        {/* Top Label (Pill) */}
        <div className="flex items-center gap-2 bg-[#f2dfd3] text-[#c08457] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm border border-[#c08457]/10">
          <Sparkles size={14} />
          Bisa Custom Desain & Ukuran
        </div>
        
        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-stone-900 tracking-tight leading-tight mb-6">
          Zen Decoration
        </h1>
        
        {/* Deskripsi */}
        <p className="text-stone-700 text-base sm:text-lg font-medium leading-relaxed max-w-xl mb-10">
          Menjual aneka jam dinding kayu, plastik, dan produk dekorasi custom estetik dengan gambar HD untuk menyempurnakan setiap sudut ruangan Anda.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
          <a 
            href="#produk" 
            className="flex items-center justify-center gap-2 bg-[#c08457] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-stone-800 transition-colors w-full sm:w-auto"
          >
            Lihat Koleksi <ArrowRight size={18} />
          </a>
          <a 
            href="#kontak" 
            className="flex items-center justify-center gap-2 bg-[#ffffff] text-[#c08457] border border-[#c08457]/20 px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-[#f2dfd3]/50 transition-colors w-full sm:w-auto"
          >
            <MessageCircle size={18} /> Chat WhatsApp
          </a>
        </div>

        {/* Info Tags (Lokasi, Jam Buka, Waktu Balas) */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-[#ffffff]/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm text-stone-700 font-medium shadow-sm border border-[#f2dfd3]/80">
              <MapPin size={16} className="text-[#c08457]" />
              Pengiriman Seluruh Indonesia
            </div>
            <div className="flex items-center gap-2 bg-[#ffffff]/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm text-stone-700 font-medium shadow-sm border border-[#f2dfd3]/80">
              <Clock size={16} className="text-[#c08457]" />
              Senin-Sabtu, 08.00-17.00
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-[#f2dfd3]/60 backdrop-blur-sm px-5 py-2 rounded-full text-xs sm:text-sm text-[#c08457] font-semibold border border-[#c08457]/10">
            <CheckCircle size={16} />
            Biasanya dibalas kurang dari 15 menit
          </div>
        </div>

      </div>
    </section>
  );
}
