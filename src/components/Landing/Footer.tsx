import { MessageCircle, MapPin } from 'lucide-react';
import { FiInstagram, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#8d6649] text-[#f2dfd3] pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Grid 4 Kolom biar lebih seimbang */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold text-[#ffffff] tracking-wider">ZENDECO</h3>
            <p className="text-sm leading-relaxed text-[#f2dfd3]/80">
              Melengkapi dan mempercantik sudut rumah Anda dengan dekorasi estetik pilihan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 border border-[#f2dfd3]/20 rounded-full hover:bg-white hover:text-[#8d6649] transition-all">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="p-2 border border-[#f2dfd3]/20 rounded-full hover:bg-white hover:text-[#8d6649] transition-all">
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* 2. Menu Links */}
          <div>
            <h4 className="text-[#ffffff] font-bold mb-6 tracking-wider text-sm uppercase">Menu</h4>
            <ul className="space-y-4 text-sm font-medium text-[#f2dfd3]/80">
              <li><a href="#" className="hover:text-[#ffffff] transition-colors">Katalog Produk</a></li>
              <li><a href="#tentang" className="hover:text-[#ffffff] transition-colors">Tentang Kami</a></li>
              <li><a href="#ulasan" className="hover:text-[#ffffff] transition-colors">Ulasan Pelanggan</a></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="space-y-4">
            <h4 className="text-[#ffffff] font-bold mb-6 tracking-wider text-sm uppercase">Kontak</h4>
            <div className="flex items-start gap-3 text-sm text-[#f2dfd3]/80">
              <MapPin size={18} className="shrink-0" />
              <p>Jl. Ciawitali No.31, Citeureup, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40512, Indonesia</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#f2dfd3]/80">
              <MessageCircle size={18} />
              <p>+62 813-2307-5821</p>
            </div>
          </div>
          
          {/* 4. Mini CTA */}
          <div className="space-y-4">
            <h4 className="text-[#ffffff] font-bold mb-6 tracking-wider text-sm uppercase">Pesan Custom?</h4>
            <a href="#kontak" className="inline-block bg-white text-[#8d6649] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#f2dfd3] transition-all">
              Chat Sekarang
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#f2dfd3]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#f2dfd3]/60">
          <p>&copy; {new Date().getFullYear()} A.M.Y. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}