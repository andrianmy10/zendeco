"use client";

import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, MessageCircle, PackageOpen } from 'lucide-react';

interface FloatingCartProps {
  cart: any[];
  updateQty: (productId: number, delta: number) => void;
}

export default function FloatingCart({ cart, updateQty }: FloatingCartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleCheckoutWA = () => {
    if (totalItems === 0) return; // Cegah checkout kalau kosong
    
    let message = "Selamat siang kak, saya mau pesan :\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n   └ Jumlah: ${item.qty} pcs\n`;
    });
    const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice);
    message += `\n*Total Tagihan: ${formattedTotal}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6287778721893?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Popup Detail Keranjang */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-80 mb-4 overflow-hidden animate-fade-in-up">
          <div className="bg-[#2F4638] text-white p-4 flex justify-between items-center">
            <h3 className="font-extrabold flex items-center gap-2">
              <ShoppingCart size={18} /> Keranjang Saya
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-[#B08D63] transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {totalItems === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-stone-400">
                <PackageOpen size={40} className="mb-2 opacity-50" />
                <p className="text-sm font-semibold">Keranjang masih kosong</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2F4638] truncate">{item.product.name}</p>
                    <p className="text-xs font-semibold text-[#B08D63]">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.product.price)}
                    </p>
                  </div>
                  
                  {/* Counter Mini di Cart */}
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg p-1">
                    <button onClick={() => updateQty(item.product.id, -1)} className="text-stone-500 hover:text-red-500">
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="text-xs font-bold text-[#2F4638] w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, 1)} className="text-stone-500 hover:text-[#2F4638]">
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-stone-500">Total Tagihan:</span>
              <span className="font-extrabold text-[#2F4638] text-lg">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice)}
              </span>
            </div>
            <button 
              onClick={handleCheckoutWA}
              disabled={totalItems === 0}
              className="w-full bg-[#B08D63] disabled:bg-stone-300 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#967651] transition-all shadow-md"
            >
              <MessageCircle size={18} /> Pesan via WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating Button (Sekarang SELALU TAMPIL) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#2F4638] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#23352a] hover:scale-105 transition-all relative"
      >
        <ShoppingCart size={24} />
        {/* Badge Jumlah Item */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-extrabold w-7 h-7 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
          {totalItems}
        </span>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.2s ease-out forwards; }
      `}} />
    </div>
  );
}