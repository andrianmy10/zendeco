import ProductCard from './ProductCard';

// Dummy data (nanti kalau udah ada API, lu tinggal ganti jadi props 'products')
const products = [
  { id: 1, name: 'Jam Dinding Kayu Minimalis', price: 'Rp 145.000', originalPrice: 'Rp 175.000', rating: 4.9, img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2070&auto=format&fit=crop', badge: 'Terlaris' },
  { id: 2, name: 'Jam Plastik Putih Elegan', price: 'Rp 95.000', originalPrice: '', rating: 4.7, img: 'https://images.unsplash.com/photo-1508013861974-9f6347163ebe?q=80&w=2076&auto=format&fit=crop', badge: '' },
  { id: 3, name: 'Dekorasi Kayu Custom HD', price: 'Rp 210.000', originalPrice: '', rating: 5.0, img: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?q=80&w=2000&auto=format&fit=crop', badge: 'Bisa Custom' },
  { id: 4, name: 'Jam Dinding Vintage Oak', price: 'Rp 185.000', originalPrice: '', rating: 4.8, img: 'https://images.unsplash.com/photo-1593361848529-61840ab360df?q=80&w=2070&auto=format&fit=crop', badge: '' },
  { id: 5, name: 'Jam Dinding Abstrak', price: 'Rp 160.000', originalPrice: '', rating: 4.6, img: 'https://images.unsplash.com/photo-1510525091763-7140e0be2199?q=80&w=2074&auto=format&fit=crop', badge: 'Baru' },
  { id: 6, name: 'Stiker Custom Jam Medium', price: 'Rp 75.000', originalPrice: '', rating: 4.5, img: 'https://images.unsplash.com/photo-1501162946741-4960f91cefa1?q=80&w=2070&auto=format&fit=crop', badge: 'Bisa Custom' },
  { id: 7, name: 'Jam Meja Kayu Klasik', price: 'Rp 120.000', originalPrice: '', rating: 4.9, img: 'https://images.unsplash.com/photo-1605721911519-3df83be2517e?q=80&w=2070&auto=format&fit=crop', badge: 'Terlaris' },
  { id: 8, name: 'Jam Dinding Industrial', price: 'Rp 175.000', originalPrice: 'Rp 200.000', rating: 4.8, img: 'https://images.unsplash.com/photo-1589129140808-65080c4a4087?q=80&w=2070&auto=format&fit=crop', badge: '' },
];

export default function ProductGrid() {
  return (
    <div className="w-full">
      {/* 
        Grid Layout:
        - Mobile (grid-cols-2): 2 kolom, gap kecil.
        - Desktop (lg:grid-cols-4): 4 kolom, gap besar.
      */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination (Opsional UI) */}
      <div className="flex justify-center mt-16 gap-2">
        {[1, 2, 3, 12].map((page, i) => (
          <button 
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              page === 1 
              ? 'bg-[#8d6649] text-white shadow-md' 
              : 'bg-white text-stone-600 border border-stone-200 hover:border-[#8d6649]'
            }`}
          >
            {page === 12 ? '...' : page}
          </button>
        ))}
        <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-[#8d6649]">
            {'>'}
        </button>
      </div>
    </div>
  );
}