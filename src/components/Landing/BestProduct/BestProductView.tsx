"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRightCircle, ShoppingBag, Star, ImageIcon, Loader2 } from 'lucide-react';

export default function BestProductView() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil 4 produk terbaru dari database
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (res.ok) {
          // Filter produk yang ada stoknya, lalu ambil 4 teratas
          const availableProducts = json.data
            .filter((p: any) => p.stok > 0)
            .slice(0, 4);
          setProducts(availableProducts);
        }
      } catch (error) {
        console.error('Error fetching best products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  // Fungsi sakti: Masukin ke keranjang terus pindah halaman
  const handleDirectBuy = (product: any) => {
    // 1. Ambil data keranjang saat ini (kalau ada)
    const existingCart = localStorage.getItem('zendecoCart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    // 2. Cek apakah barang udah ada di keranjang
    const existingItemIndex = cart.findIndex((item: any) => item.product.id === product.id);

    if (existingItemIndex >= 0) {
      // Kalau udah ada, tambah qty (maksimal batas stok)
      const currentQty = cart[existingItemIndex].qty;
      cart[existingItemIndex].qty = Math.min(currentQty + 1, product.stok);
    } else {
      // Kalau belum ada, masukin sbg barang baru
      cart.push({ product: product, qty: 1 });
    }

    // 3. Simpan balik ke localStorage
    localStorage.setItem('zendecoCart', JSON.stringify(cart));

    // 4. Terbang ke halaman list produk!
    router.push('/produk');
  };

  return (
    <section id="produk" className="w-full bg-[#F1EFE7] py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-[#B08D63] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
              Koleksi Terbaru
            </span>
            <h2 className="text-4xl md:text-5xl text-[#2F4638] font-extrabold tracking-tight">
              Produk <span className="text-[#B08D63]">Unggulan</span> Kami
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/produk" 
              className="flex items-center gap-2 text-[#2F4638] font-bold hover:text-[#B08D63] transition-colors ml-6 group"
            >
              Lihat Semua
              <ArrowRightCircle size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-[#B08D63]" />
          </div>
        ) : (
          /* Grid: Mobile 2x2, Desktop 4x1 */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => {
              const imgPath = product.images ? JSON.parse(product.images)[0] : null;
              const formattedPrice = new Intl.NumberFormat('id-ID', { 
                style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
              }).format(product.price);

              let badgeText = '';
              let badgeStyle = '';
              if (product.stok < 5 && product.stok > 0) {
                badgeText = 'Sisa Dikit';
                badgeStyle = 'bg-red-500 text-white';
              } else {
                badgeText = 'Terbaru';
                badgeStyle = 'bg-[#B08D63] text-white';
              }

              return (
                <div 
                  key={product.id} 
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2F4638]/10 hover:-translate-y-1.5 transition-all duration-500 border border-[#F1EFE7] flex flex-col"
                >
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-square overflow-hidden bg-stone-50 flex items-center justify-center">
                    {imgPath ? (
                      <img 
                        src={imgPath} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <ImageIcon size={32} className="text-stone-300" />
                    )}

                    <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full z-10 shadow-sm ${badgeStyle}`}>
                      {badgeText}
                    </span>
                  </div>
                  
                  {/* Info Container */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex items-center gap-1">
                        <Star size={13} className="fill-[#B08D63] text-[#B08D63]" />
                        <span className="text-xs font-bold text-stone-500">5.0</span>
                      </div>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-[#2F4638] mb-2 group-hover:text-[#B08D63] transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-2">
                      <p className="text-[#B08D63] font-extrabold text-sm md:text-lg mb-4">
                        {formattedPrice}
                      </p>

                      {/* Tombol Beli yang memicu injeksi localStorage & Redirect */}
                      <button 
                        onClick={() => handleDirectBuy(product)}
                        className="w-full flex items-center justify-center gap-2 bg-white text-[#B08D63] font-extrabold text-xs md:text-sm py-2.5 rounded-xl hover:bg-[#B08D63] hover:text-white border-2 border-[#B08D63] transition-all"
                      >
                        <ShoppingBag size={16} strokeWidth={2.5} /> Beli 
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}