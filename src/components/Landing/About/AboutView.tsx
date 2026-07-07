import Image from 'next/image';
import {
  TreePine,
  Gem,
  Layers,
  Palette,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: TreePine,
    title: 'Kayu & Plastik',
    desc: 'Material jam dinding lengkap, dari kayu solid sampai plastik berkualitas.',
  },
  {
    icon: Gem,
    title: 'Kaca & Non-Kaca',
    desc: 'Tersedia varian kaca maupun non-kaca sesuai kebutuhan ruangan.',
  },
  {
    icon: Layers,
    title: 'Laminasi HD',
    desc: 'Stiker custom dilaminasi dengan gambar HD, awet dan tidak mudah pudar.',
  },
  {
    icon: Palette,
    title: 'Bisa Full Custom',
    desc: 'Desain, ukuran, hingga gambar bisa disesuaikan dengan keinginan Anda.',
  },
];

export default function AboutView() {
  return (
    <section
      id="tentang"
      className="w-full bg-white py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ========================= */}
          {/* IMAGE DESKTOP */}
          {/* ========================= */}
          <div className="hidden md:flex relative w-full justify-center md:justify-start">
            <div className="relative w-[85%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
              <Image
                src="/assets/img/about1.png"
                alt="Tentang Zen Decoration"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[45%] aspect-square rounded-[1.5rem] overflow-hidden shadow-xl border-[6px] border-white">
              <Image
                src="/assets/img/about2.png"
                alt="Produk Zen Decoration"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#f2dfd3] rounded-full blur-3xl opacity-70 -z-10" />

            <div className="absolute top-6 left-4 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-stone-100">
              <div className="w-10 h-10 rounded-full bg-[#f2dfd3] flex items-center justify-center">
                <Palette
                  size={18}
                  className="text-[#c08457]"
                />
              </div>

              <div>
                <p className="font-bold text-sm">
                  100% Custom
                </p>
                <p className="text-xs text-stone-500">
                  Sesuai Keinginan Anda
                </p>
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* CONTENT */}
          {/* ========================= */}

          <div>
            <span className="text-[#c08457] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
              Tentang Kami
            </span>

            <h2 className="text-4xl md:text-5xl text-stone-900 font-extrabold tracking-tight mb-6 leading-tight">
              Mengenal{' '}
              <span className="text-[#c08457]">
                Zen Decoration
              </span>
            </h2>

            <p className="text-stone-600 text-base leading-relaxed mb-10">
              Zen Decoration (ZenDeco) menjual aneka jam
              dinding kayu dan plastik, kaca dan non-kaca,
              dengan stiker custom maupun non-custom yang
              dilaminasi dan menggunakan gambar HD. Kami
              juga melayani berbagai produk custom estetik
              lainnya untuk melengkapi dan mempercantik
              rumah Anda.
            </p>

            {/* ========================= */}
            {/* IMAGE MOBILE */}
            {/* ========================= */}

            <div className="relative flex justify-center mb-12 md:hidden">
              <div className="relative w-[85%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
                <Image
                  src="/assets/img/about1.png"
                  alt="Tentang Zen Decoration"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-0 right-3 w-[42%] aspect-square rounded-[1.5rem] overflow-hidden shadow-xl border-[6px] border-white">
                <Image
                  src="/assets/img/about2.png"
                  alt="Produk Zen Decoration"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -top-6 -left-4 w-32 h-32 bg-[#f2dfd3] rounded-full blur-3xl opacity-70 -z-10" />

              <div className="absolute top-5 left-0 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-stone-100">
                <div className="w-10 h-10 rounded-full bg-[#f2dfd3] flex items-center justify-center">
                  <Palette
                    size={18}
                    className="text-[#c08457]"
                  />
                </div>

                <div>
                  <p className="font-bold text-sm">
                    100% Custom
                  </p>

                  <p className="text-xs text-stone-500">
                    Sesuai Keinginan Anda
                  </p>
                </div>
              </div>
            </div>

            {/* ========================= */}
            {/* FEATURES */}
            {/* ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-stone-100 hover:border-[#c08457]/30 hover:bg-[#fdfbf9] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f2dfd3] flex items-center justify-center flex-shrink-0">
                      <Icon
                        size={18}
                        className="text-[#c08457]"
                      />
                    </div>

                    <div>
                      <p className="text-stone-900 font-bold text-sm mb-1">
                        {feature.title}
                      </p>

                      <p className="text-stone-500 text-xs leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================= */}
            {/* BUTTON */}
            {/* ========================= */}

            <div className="flex justify-center md:justify-start">
              <a
                href="#kontak"
                className="inline-flex items-center gap-2 bg-[#c08457] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-stone-800 transition-all duration-300"
              >
                Konsultasi Custom

                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}