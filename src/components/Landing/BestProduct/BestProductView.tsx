import Link from 'next/link';
import { ArrowRightCircle, Heart, ShoppingBag, Star } from 'lucide-react';

// Data dummy
const products = [
  { id: 1, name: 'Jam Dinding Kayu Minimalis', price: 'Rp 145.000', originalPrice: 'Rp 175.000', rating: 4.9, img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2070&auto=format&fit=crop', badge: 'Terlaris' },
  { id: 2, name: 'Jam Plastik Putih Elegan', price: 'Rp 95.000', originalPrice: '', rating: 4.7, img: 'https://images.unsplash.com/photo-1508013861974-9f6347163ebe?q=80&w=2076&auto=format&fit=crop', badge: '' },
  { id: 3, name: 'Dekorasi Kayu Custom HD', price: 'Rp 210.000', originalPrice: '', rating: 5.0, img: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?q=80&w=2000&auto=format&fit=crop', badge: 'Bisa Custom' },
  { id: 4, name: 'Jam Dinding Vintage Oak', price: 'Rp 185.000', originalPrice: '', rating: 4.8, img: 'https://images.unsplash.com/photo-1593361848529-61840ab360df?q=80&w=2070&auto=format&fit=crop', badge: '' },
];

const badgeStyles: Record<string, string> = {
  'Terlaris': 'bg-[#c08457] text-white',
  'Bisa Custom': 'bg-stone-900 text-white',
  'Baru': 'bg-emerald-600 text-white',
};

export default function BestProductView() {
  return (
    <section id="produk" className="w-full bg-[#f8f1eb] py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-[#c08457] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
              Koleksi Terbaik
            </span>
            <h2 className="text-4xl md:text-5xl text-stone-900 font-extrabold tracking-tight">
              Produk <span className="text-[#c08457]">Unggulan</span> Kami
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/produk" 
              className="flex items-center gap-2 text-stone-600 font-bold hover:text-[#c08457] transition-colors ml-6 group"
            >
              Lihat Semua
              <ArrowRightCircle size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Grid: Mobile 2x2, Desktop 4x1 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#c08457]/15 hover:-translate-y-1.5 transition-all duration-500 border border-stone-100"
            >
              
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full z-10 shadow-sm ${badgeStyles[product.badge] || 'bg-[#c08457] text-white'}`}>
                    {product.badge}
                  </span>
                )}

                {/* Quick Add Button */}
                <button className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-2 bg-stone-900 text-white font-bold text-xs md:text-sm py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-[#c08457] z-10">
                  <ShoppingBag size={15} strokeWidth={2.5} />
                  Tambah Cepat
                </button>
              </div>
              
              {/* Info Container */}
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-1 mb-1.5">
                  <Star size={13} className="fill-[#c08457] text-[#c08457]" />
                  <span className="text-xs font-semibold text-stone-500">{product.rating}</span>
                </div>

                <h3 className="text-sm md:text-base font-bold text-stone-800 mb-2 group-hover:text-[#c08457] transition-colors line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2">
                  <p className="text-[#c08457] font-extrabold text-sm md:text-lg">
                    {product.price}
                  </p>
                  {product.originalPrice && (
                    <p className="text-stone-400 text-xs md:text-sm line-through font-medium">
                      {product.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}