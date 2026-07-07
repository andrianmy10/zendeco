"use client";

import { Edit2, Trash2, Loader2, ImageIcon } from 'lucide-react';

interface ProductTableProps {
  products: any[];
  isLoading: boolean;
  startIndex: number;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, isLoading, startIndex, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#F1EFE7]">
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">No</th>
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Foto</th>
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Nama Barang</th>
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Kategori</th>
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Harga</th>
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider">Stok</th>
            <th className="py-4 px-4 text-xs font-bold text-[#B08D63] uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F1EFE7]">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="py-12 text-center">
                <Loader2 className="animate-spin mx-auto text-[#B08D63]" size={32} />
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-stone-500 font-medium text-sm">
                Produk tidak ditemukan atau katalog masih kosong.
              </td>
            </tr>
          ) : (
            products.map((product, index) => {
              const imgPath = product.images ? JSON.parse(product.images)[0] : null;
              const itemStok = product.stok;
              const nomorUrut = startIndex + index + 1;
              
              return (
                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors animate-fade" style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}>
                  <td className="py-4 px-4 text-sm font-bold text-stone-400">{nomorUrut}</td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center relative shrink-0">
                      {imgPath ? (
                        <img src={imgPath} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={18} className="text-stone-400" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 max-w-[200px]">
                    <p className="text-sm font-extrabold text-[#2F4638] truncate">{product.name}</p>
                    <p className="text-xs text-stone-400 font-medium truncate mt-0.5">{product.description}</p>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-stone-600">
                    {product.categoryName || 'Tanpa Kategori'}
                  </td>
                  <td className="py-4 px-4 text-sm font-extrabold text-[#2F4638]">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center justify-center font-bold text-xs px-2.5 py-1 rounded-full ${
                      itemStok === 0 ? 'bg-red-50 text-red-600' : itemStok < 10 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                      {itemStok === 0 ? 'Habis' : `${itemStok} Pcs`}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(product)} className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}