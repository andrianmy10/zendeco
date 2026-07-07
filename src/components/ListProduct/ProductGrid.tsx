"use client";

import { useState } from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: any[];
  cart: any[];
  updateQty: (productId: number, delta: number) => void;
}

export default function ProductGrid({ products, cart, updateQty }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  if (products.length === 0) {
    return (
      <div className="w-full py-20 text-center bg-stone-50 rounded-3xl border border-dashed border-stone-300">
        <p className="text-stone-500 font-semibold">Produk yang Anda cari tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {currentProducts.map((product) => {
          // Cari tau produk ini udah dipesan berapa banyak
          const cartItem = cart.find(c => c.product.id === product.id);
          const cartQty = cartItem ? cartItem.qty : 0;

          return (
            <ProductCard 
              key={product.id} 
              product={product} 
              cartQty={cartQty}
              updateQty={updateQty}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-16 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button 
              key={page} onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                currentPage === page 
                ? 'bg-[#2F4638] text-white shadow-md shadow-[#2F4638]/20' 
                : 'bg-white text-stone-500 border border-stone-200 hover:border-[#B08D63] hover:text-[#B08D63]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}