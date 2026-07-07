"use client";

import { Search, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  categories: any[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}

export default function FilterBar({
  categories, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory
}: FilterBarProps) {
  
  return (
    <div className="w-full flex flex-col gap-6 mb-12">
      {/* Baris Atas: Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        
        <div className="relative flex-grow">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} strokeWidth={2.5} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari produk Zendeco..."
            className="w-full pl-14 pr-6 py-4 rounded-full border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] transition-all text-sm placeholder:text-stone-400 font-medium bg-stone-50 focus:bg-white"
          />
        </div>

        <div className="relative w-full md:w-56">
          <button className="w-full flex items-center justify-between px-6 py-4 rounded-full border border-stone-200 text-sm font-semibold text-[#2F4638] hover:border-[#B08D63] transition-all bg-stone-50 focus:outline-none">
            Urutkan: <span className="text-[#B08D63] font-bold">Terbaru</span>
            <ChevronDown size={18} className="text-stone-400" />
          </button>
        </div>
      </div>

      {/* Baris Bawah: Category Pills Dinamis dari DB */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all border ${
            selectedCategory === ''
              ? "bg-[#2F4638] text-white border-[#2F4638] shadow-md shadow-[#2F4638]/20"
              : "bg-white text-stone-500 border-stone-200 hover:border-[#B08D63] hover:text-[#B08D63]"
          }`}
        >
          Semua Produk
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id.toString())}
            className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all border ${
              selectedCategory === cat.id.toString()
                ? "bg-[#2F4638] text-white border-[#2F4638] shadow-md shadow-[#2F4638]/20"
                : "bg-white text-stone-500 border-stone-200 hover:border-[#B08D63] hover:text-[#B08D63]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}