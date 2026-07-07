"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
}

export default function ProductPagination({
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems
}: ProductPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-[#F1EFE7]">
      <p className="text-xs font-semibold text-stone-500">
        Menampilkan <span className="font-bold text-[#2F4638]">{startIndex + 1}</span> - <span className="font-bold text-[#2F4638]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> dari <span className="font-bold text-[#2F4638]">{totalItems}</span> barang
      </p>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-stone-50 border border-stone-200 text-[#2F4638] hover:bg-[#F1EFE7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>
        
        <div className="text-sm font-bold text-[#2F4638] px-2">
          {currentPage} <span className="text-stone-400 font-medium">/ {totalPages}</span>
        </div>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-stone-50 border border-stone-200 text-[#2F4638] hover:bg-[#F1EFE7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}