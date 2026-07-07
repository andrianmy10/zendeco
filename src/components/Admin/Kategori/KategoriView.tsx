"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Tags, X, Loader2, AlertTriangle } from 'lucide-react';

export default function KategoriView() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', deskripsi: '' });

  // State Modal Hapus (Custom Alert)
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. READ
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/categories');
      const json = await res.json();
      if (res.ok) setCategories(json.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handler Form
  const handleAdd = () => {
    setEditId(null);
    setFormData({ name: '', deskripsi: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (cat: any) => {
    setEditId(cat.id);
    setFormData({ name: cat.name, deskripsi: cat.deskripsi });
    setIsModalOpen(true);
  };

  // 2 & 3. CREATE & UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = editId ? `/api/categories/${editId}` : '/api/categories';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (error) {
      console.error('Error saving data', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. DELETE (Eksekusi setelah konfirmasi dari Custom Modal)
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/categories/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setDeleteId(null); // Tutup modal
        fetchCategories(); // Refresh data
      } else {
        alert('Gagal menghapus data');
      }
    } catch (error) {
      console.error('Error deleting data', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full space-y-6 relative">
      
      {/* Injeksi CSS Keyframes buat Animasi Ringan */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fade { animation: fadeIn 0.2s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 animate-fade">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2F4638] flex items-center gap-2">
            Kelola Kategori <Tags size={24} className="text-[#B08D63]" />
          </h1>
          <p className="text-[#B08D63] text-sm mt-1 font-semibold">
            Atur jenis dan kategori produk toko Anda di sini.
          </p>
        </div>
        
        <button 
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2F4638] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#23352a] hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-[#2F4638]/20"
        >
          <Plus size={18} strokeWidth={2.5} /> 
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white p-6 mt-10 lg:p-8 rounded-[2rem] shadow-sm border border-stone-200 animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F1EFE7]">
                <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">No</th>
                <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Nama Kategori</th>
                <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Deskripsi</th>
                <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFE7]">
                {isLoading ? (
                    <tr>
                    <td colSpan={4} className="py-12 text-center">
                        <Loader2 className="animate-spin mx-auto text-[#B08D63]" size={32} />
                    </td>
                    </tr>
                ) : categories.length === 0 ? (
                    <tr>
                    <td colSpan={4} className="py-12 text-center text-stone-500 font-medium text-sm">
                        Belum ada data kategori.
                    </td>
                    </tr>
                ) : (
                    categories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-stone-50/50 transition-colors animate-fade" style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}>
                        <td className="py-4 px-4 text-sm font-bold text-stone-400">{index + 1}</td>
                        <td className="py-4 px-4 text-sm font-extrabold text-[#2F4638]">{category.name}</td>
                        <td className="py-4 px-4 text-sm font-medium text-stone-500">{category.deskripsi}</td>
                        
                        {/* Di sini perubahannya bre, opacity-0 dan group-hover-nya udah gue buang */}
                        <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                            <button 
                            onClick={() => handleEdit(category)} 
                            className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                            >
                            <Edit2 size={18} />
                            </button>
                            <button 
                            onClick={() => setDeleteId(category.id)} 
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                            >
                            <Trash2 size={18} />
                            </button>
                        </div>
                        </td>

                    </tr>
                    ))
                )}
                </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative animate-slide-up">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-700 transition-colors">
              <X size={20} />
            </button>

            <h2 className="text-xl font-extrabold text-[#2F4638] mb-6">
              {editId ? 'Edit Kategori' : 'Tambah Kategori'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Nama Kategori</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] font-semibold transition-all bg-stone-50 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#B08D63] block mb-1.5">Deskripsi</label>
                <textarea 
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:border-[#B08D63] focus:ring-1 focus:ring-[#B08D63] text-sm text-[#2F4638] h-24 resize-none transition-all bg-stone-50 focus:bg-white font-medium"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#2F4638] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#23352a] transition-all disabled:opacity-70 mt-6 flex justify-center items-center shadow-lg"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Simpan Kategori'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Modal Alert Hapus */}
      {deleteId && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative animate-slide-up text-center">
            
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={32} strokeWidth={2.5} />
            </div>

            <h3 className="text-xl font-extrabold text-[#2F4638] mb-2">Hapus Kategori?</h3>
            <p className="text-sm font-medium text-stone-500 mb-8 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Kategori ini akan dihapus secara permanen dari sistem.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3.5 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors disabled:opacity-50 text-sm"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all disabled:opacity-70 text-sm flex justify-center items-center"
              >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}