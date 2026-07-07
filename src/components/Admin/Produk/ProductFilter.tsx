"use client";

import { Search, Filter, ChevronDown } from 'lucide-react';

interface ProductFilterProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: any[];
}

export default function ProductFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}: ProductFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="flex items-center gap-3 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200 focus-within:border-[#B08D63] focus-within:ring-1 focus-within:ring-[#B08D63] transition-all w-full md:w-80">
        <Search size={18} className="text-stone-400" strokeWidth={2.5} />
        <input 
          type="text" 
          placeholder="Cari nama barang..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none focus:outline-none text-sm text-[#2F4638] placeholder:text-stone-400 w-full font-medium" 
        />
      </div>

      {/* Custom Styled Dropdown Filter */}
      <div className="relative flex items-center bg-stone-50 rounded-2xl border border-stone-200 focus-within:border-[#B08D63] focus-within:ring-1 focus-within:ring-[#B08D63] transition-all w-full md:w-64">
        <Filter size={18} className="absolute left-4 text-stone-400 pointer-events-none" strokeWidth={2.5} />
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-transparent border-none focus:outline-none text-sm text-[#2F4638] w-full pl-11 pr-10 py-3 font-semibold cursor-pointer appearance-none z-10"
        >
          <option value="">Semua Kategori</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {/* Panah Custom */}
        <ChevronDown size={16} className="absolute right-4 text-[#B08D63] pointer-events-none z-0" strokeWidth={2.5} />
      </div>
    </div>
  );
}