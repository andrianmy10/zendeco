"use client";

import { useState, useEffect } from 'react';
import { Plus, Box, AlertTriangle, Loader2 } from 'lucide-react';

// Import sub-komponen pecahan kita
import ProductFilter from './ProductFilter';
import ProductTable from './ProductTable';
import ProductPagination from './ProductPagination';
import ProductFormModal from './ProductFormModal';

export default function ProdukView() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Filter & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // State Modal Form fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stok, setStok] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // State Modal Hapus
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const initData = async () => {
    setIsLoading(true);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);
      const jsonProd = await resProd.json();
      const jsonCat = await resCat.json();
      
      if (resProd.ok) setProducts(jsonProd.data);
      if (resCat.ok) setCategories(jsonCat.data);
    } catch (error) {
      console.error('Gagal memuat data operasional', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { initData(); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory]);

  // Logic filter & paging
  const filteredProducts = products.filter(prod => {
    const matchSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory ? prod.categoryId.toString() === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = () => {
    setEditId(null); setName(''); setDescription(''); setPrice(''); setStok(''); setCategoryId(''); setImageFile(null); setImagePreview('');
    setIsModalOpen(true);
  };

  const handleEdit = (prod: any) => {
    setEditId(prod.id); setName(prod.name); setDescription(prod.description); setPrice(prod.price.toString()); setStok(prod.stok.toString()); setCategoryId(prod.categoryId.toString()); setImageFile(null);
    setImagePreview(prod.images ? JSON.parse(prod.images)[0] : '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stok', stok);
    formData.append('categoryId', categoryId);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch(editId ? `/api/products/${editId}` : '/api/products', {
        method: editId ? 'PUT' : 'POST',
        body: formData,
      });
      if (res.ok) { setIsModalOpen(false); initData(); }
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      if (res.ok) { setDeleteId(null); initData(); }
    } catch (error) { console.error(error); } finally { setIsDeleting(false); }
  };

  return (
    <div className="w-full space-y-6 relative">
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
            Kelola Produk <Box size={24} className="text-[#B08D63]" />
          </h1>
          <p className="text-[#B08D63] text-sm mt-1 font-semibold">
            Manajemen katalog barang, harga, stok, dan kategori Zendeco.
          </p>
        </div>
        <button onClick={handleAdd} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2F4638] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#23352a] transition-all shadow-md shadow-[#2F4638]/20"><Plus size={18} /> <span>Tambah Produk</span></button>
      </div>

      {/* Main Container */}
      <div className="bg-white p-6 mt-10 lg:p-8 rounded-[2rem] shadow-sm border border-stone-200 animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
        <ProductFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
        <ProductTable products={paginatedProducts} isLoading={isLoading} startIndex={startIndex} onEdit={handleEdit} onDelete={setDeleteId} />
        {!isLoading && totalPages > 1 && (
          <ProductPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} startIndex={startIndex} itemsPerPage={itemsPerPage} totalItems={filteredProducts.length} />
        )}
      </div>

      {/* Modal Form */}
      <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editId={editId} categories={categories} isSubmitting={isSubmitting} onSubmit={handleSubmit} name={name} setName={setName} description={description} setDescription={setDescription} price={price} setPrice={setPrice} stok={stok} setStok={setStok} categoryId={categoryId} setCategoryId={setCategoryId} imagePreview={imagePreview} handleImageChange={handleImageChange} />

      {/* Modal Hapus */}
      {deleteId && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative text-center animate-slide-up">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5"><AlertTriangle size={32} /></div>
            <h3 className="text-xl font-extrabold text-[#2F4638] mb-2">Hapus Produk?</h3>
            <p className="text-sm font-medium text-stone-500 mb-8 leading-relaxed">Tindakan ini permanen. Produk terpilih akan dihapus selamanya dari katalog aktif Zendeco.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} disabled={isDeleting} className="flex-1 px-4 py-3.5 rounded-xl font-bold text-stone-600 bg-stone-100 text-sm">Batal</button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 px-4 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 text-sm flex justify-center items-center">{isDeleting ? <Loader2 size={18} className="animate-spin" /> : 'Ya, Hapus'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}