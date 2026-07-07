import Header from '../Landing/Header'; // Import dari komponen yang sama
import Footer from '../Landing/Footer';
import FilterBar from './FilterBar';
import StatsBar from './StatsBar';
import FeaturedProduct from './FeaturedProduct';
import ProductGrid from './ProductGrid';

export default function ListProductView() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-sans overflow-x-hidden">
      {/* Header sama, biar konsisten */}
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            
            {/* Title Section */}
            <div className="mb-10 text-center md:text-left">
                <span className="text-[#c08457] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Produk Kami</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">Koleksi Jam Dinding Premium</h1>
            </div>

            {/* Komponen Katalog */}
            <FilterBar />
            <StatsBar />
            <FeaturedProduct />
            <ProductGrid />
            
            {/* Consultation Section (Bawah) */}
            <div className="mt-20 bg-stone-900 text-white p-12 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Belum menemukan yang sesuai?</h3>
                    <p className="text-stone-400">Konsultasikan desain impianmu, kami siap wujudkan jam dinding custom sesuai keinginan Anda.</p>
                </div>
                <a 
                    href="https://wa.me/6281234567890" 
                    className="bg-[#c08457] px-8 py-4 rounded-full font-bold text-sm hover:bg-[#a37048] transition-all whitespace-nowrap"
                >
                    Konsultasi Sekarang
                </a>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}