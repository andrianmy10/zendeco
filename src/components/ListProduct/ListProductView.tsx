"use client";

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import Header from '../Landing/Header';
import Footer from '../Landing/Footer';
import FilterBar from './FilterBar';
import StatsBar from './StatsBar';
import FeaturedProduct from './FeaturedProduct';
import ProductGrid from './ProductGrid';
import FloatingCart from './FloatingCart'; // <-- Import Floating Cart

export default function ListProductView() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // --- CART STATE LOGIC ---
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);

  // Load keranjang dari memori browser pas pertama kali buka
  useEffect(() => {
    const savedCart = localStorage.getItem('zendecoCart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Fungsi buat Nambah / Ngurangin item di keranjang
  const updateQty = (productId: number, delta: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      const productObj = products.find(p => p.id === productId);
      
      let newCart;

      if (existingItem) {
        // Kalau barang udah ada, ubah jumlahnya
        newCart = prevCart.map(item => {
          if (item.product.id === productId) {
            // Cegah pesan lebih dari stok
            const newQty = Math.min(Math.max(item.qty + delta, 0), item.product.stok);
            return { ...item, qty: newQty };
          }
          return item;
        }).filter(item => item.qty > 0); // Hapus otomatis kalau jumlahnya 0
      } else {
        // Kalau barang baru, masukin ke array
        if (delta > 0 && productObj) {
          newCart = [...prevCart, { product: productObj, qty: 1 }];
        } else {
          newCart = prevCart;
        }
      }

      // Simpan langsung ke memori browser
      localStorage.setItem('zendecoCart', JSON.stringify(newCart));
      return newCart;
    });
  };
  // ------------------------

  useEffect(() => {
    const fetchCatalogData = async () => {
      setIsLoading(true);
      try {
        const [resProd, resCat] = await Promise.all([ fetch('/api/products'), fetch('/api/categories') ]);
        const jsonProd = await resProd.json();
        const jsonCat = await resCat.json();
        
        if (resProd.ok) setProducts(jsonProd.data.filter((p: any) => p.stok > 0));
        if (resCat.ok) setCategories(jsonCat.data);
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchCatalogData();
  }, []);

  const filteredProducts = products.filter(prod => {
    const matchSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory ? prod.categoryId.toString() === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  const featuredProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-sans overflow-x-hidden relative">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            
            <div className="mb-10 text-center md:text-left">
                <span className="text-[#B08D63] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Katalog Lengkap</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#2F4638] tracking-tight">Koleksi Produk Zendeco</h1>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <Loader2 className="animate-spin text-[#B08D63] mb-4" size={48} />
                <p className="text-stone-500 font-semibold text-sm">Memuat koleksi produk...</p>
              </div>
            ) : (
              <>
                <FilterBar categories={categories} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <StatsBar totalProducts={products.length} filteredCount={filteredProducts.length} />
                
                {!searchTerm && !selectedCategory && featuredProduct && (
                  <FeaturedProduct product={featuredProduct} />
                )}
                
                {/* Oper cart & updateQty ke Grid */}
                <ProductGrid 
                  products={filteredProducts} 
                  cart={cart}
                  updateQty={updateQty}
                />
              </>
            )}
            
            <div className="mt-20 bg-[#2F4638] text-white p-12 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-[#2F4638]/20">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Belum menemukan yang sesuai?</h3>
                    <p className="text-stone-300 font-medium">Konsultasikan desain impianmu, kami siap wujudkan dekorasi custom sesuai keinginan Anda.</p>
                </div>
                <a href="https://wa.me/6281234567890" target="_blank" className="bg-[#B08D63] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#967651] transition-all whitespace-nowrap shadow-lg shadow-[#B08D63]/30">
                    Konsultasi Sekarang
                </a>
            </div>
        </div>
      </main>

      <Footer />

      <FloatingCart cart={cart} updateQty={updateQty} />
    </div>
  );
}