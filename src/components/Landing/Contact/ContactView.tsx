import { MessageCircle, MapPin, Mail, ArrowRight } from 'lucide-react';

export default function ContactView() {
  return (
    <section id="kontak" className="py-24 bg-[#ffffff]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* KIRI: Pesan Ajakan */}
          <div>
            <span className="text-[#c08457] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Hubungi Kami</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-6">
              Siap Mempercantik <br /> <span className="text-[#c08457]">Ruangan Anda?</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-lg">
              Punya ide desain sendiri atau ingin konsultasi ukuran? Jangan ragu untuk hubungi tim kami. Kami siap membantu mewujudkan dekorasi impian Anda dengan kualitas terbaik.
            </p>
            
            <a 
              href="https://wa.me/6281323075821" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#c08457] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#c08457]/30 hover:bg-stone-800 transition-all duration-300"
            >
              <MessageCircle size={20} />
              Chat via WhatsApp
            </a>
          </div>

          {/* KANAN: Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: WhatsApp */}
            <div className="bg-[#f8f1eb] p-8 rounded-3xl border border-[#c08457]/10 flex flex-col gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#c08457] shadow-sm">
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">WhatsApp</h4>
                <p className="text-[#c08457] font-semibold text-sm">+62 813-2307-5821</p>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="bg-[#f8f1eb] p-8 rounded-3xl border border-[#c08457]/10 flex flex-col gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#c08457] shadow-sm">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Email</h4>
                <p className="text-[#c08457] font-semibold text-sm">halozendeco@gmail.com</p>
              </div>
            </div>

            {/* Card 3: Location (Span 2 col on desktop) */}
            <div className="sm:col-span-2 bg-[#f8f1eb] p-8 rounded-3xl border border-[#c08457]/10 flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#c08457] shadow-sm flex-shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Lokasi</h4>
                <p className="text-stone-600 text-sm">Jl. Ciawitali No.31, Citeureup, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40512, Indonesia</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}