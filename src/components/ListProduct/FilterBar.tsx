"use client";

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const categories = [
  "Semua Produk (48)", 
  "Kayu", 
  "Plastik", 
  "Kaca", 
  "Non Kaca", 
  "Custom", 
  "Best Seller", 
  "New Arrival"
];

export default function FilterBar() {
  const [activeCategory, setActiveCategory] = useState("Semua Produk (48)");

  return (
    <div className="w-full flex flex-col gap-6 mb-12">
      {/* Baris Atas: Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input
            type="text"
            placeholder="Cari jam dinding..."
            className="w-full pl-14 pr-6 py-4 rounded-full border border-stone-200 focus:outline-none focus:border-[#c08457] focus:ring-1 focus:ring-[#c08457] transition-all text-sm placeholder:text-stone-400"
          />
        </div>

        {/* Sort Dropdown Button */}
        <div className="relative w-full md:w-56">
          <button className="w-full flex items-center justify-between px-6 py-4 rounded-full border border-stone-200 text-sm font-semibold text-stone-600 hover:border-[#c08457] transition-all focus:outline-none">
            Urutkan: <span className="text-stone-900">Terbaru</span>
            <ChevronDown size={18} className="text-stone-400" />
          </button>
        </div>
      </div>

      {/* Baris Bawah: Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all border ${
              activeCategory === cat
                ? "bg-[#8d6649] text-white border-[#8d6649]" // Warna baru sesuai request
                : "bg-white text-stone-600 border-stone-200 hover:border-[#8d6649] hover:text-[#8d6649]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}