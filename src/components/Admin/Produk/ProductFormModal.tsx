"use client";

import { useRef } from 'react';
import { X, Loader2, ImageIcon, ChevronDown } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  categories: any[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  // Form values & setters
  name: string; setName: (val: string) => void;
  description: string; setDescription: (val: string) => void;
  price: string; setPrice: (val: string) => void;
  stok: string; setStok: (val: string) => void;
  categoryId: string; setCategoryId: (val: string) => void;
  imagePreview: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductFormModal({
  isOpen, onClose, editId, categories, isSubmitting, onSubmit,
  name, setName, description, setDescription, price, setPrice, stok, setStok, categoryId, setCategoryId,
  imagePreview, handleImageChange
}: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade">
      <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto scrollbar-thin">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-stone-700 transition-colors">
          <X size={20} />
        </button>

        <h2 className="text-xl font-extrabold text-[#2F4638] mb-6">
          {editId ? 'Edit Data Produk' : 'Tambah Produk Baru'}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Nama Barang</label>
              <input 
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] font-semibold bg-stone-50 focus:bg-white transition-all" required
              />
            </div>
            
            {/* Custom Styled Dropdown Kategori di Form */}
            <div>
              <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Kategori</label>
              <div className="relative flex items-center">
                <select 
                  value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] font-semibold bg-stone-50 focus:bg-white transition-all appearance-none cursor-pointer z-10" required
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#B08D63] pointer-events-none z-0" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Harga Satuan (Rp)</label>
              <input 
                type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] font-semibold bg-stone-50 focus:bg-white transition-all" required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Jumlah Stok Tersedia</label>
              <input 
                type="number" value={stok} onChange={(e) => setStok(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] font-semibold bg-stone-50 focus:bg-white transition-all" required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Deskripsi Produk</label>
            <textarea 
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] h-20 resize-none bg-stone-50 focus:bg-white transition-all font-medium"
            ></textarea>
          </div>

          <div>
            <label className="text-xs font-bold text-[#B08D63] block mb-2">Foto Produk</label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
              <div className="w-24 h-24 rounded-xl bg-white border border-stone-200 flex items-center justify-center overflow-hidden relative shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-stone-300" />
                )}
              </div>
              <div className="w-full text-center sm:text-left">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                <button 
                  type="button" onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white border border-stone-300 text-stone-700 text-xs font-bold rounded-lg hover:bg-stone-100 transition-colors shadow-sm"
                >
                  Pilih Gambar
                </button>
                <p className="text-[10px] text-stone-400 mt-2 font-medium">PNG, JPG, JPEG diterima. Sistem otomatis mengonversi ke format efisien .WebP</p>
              </div>
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full bg-[#2F4638] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#23352a] transition-all disabled:opacity-70 mt-4 flex justify-center items-center shadow-lg"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Simpan Informasi Produk'}
          </button>
        </form>
      </div>
    </div>
  );
}