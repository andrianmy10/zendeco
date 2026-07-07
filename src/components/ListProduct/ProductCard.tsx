import { Heart, ShoppingBag, Star, ImageIcon, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: any;
  cartQty: number;
  updateQty: (productId: number, delta: number) => void;
}

export default function ProductCard({ product, cartQty, updateQty }: ProductCardProps) {
  const imgPath = product.images ? JSON.parse(product.images)[0] : null;
  const formattedPrice = new Intl.NumberFormat('id-ID', { 
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
  }).format(product.price);

  let badgeText = '';
  let badgeStyle = '';
  if (product.stok < 5 && product.stok > 0) {
    badgeText = 'Sisa Dikit';
    badgeStyle = 'bg-red-500 text-white';
  } else if (product.stok >= 50) {
    badgeText = 'Tersedia Banyak';
    badgeStyle = 'bg-[#2F4638] text-white';
  } else {
    badgeText = 'Ready Stock';
    badgeStyle = 'bg-[#B08D63] text-white';
  }

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-[#F1EFE7] shadow-sm hover:shadow-2xl hover:shadow-[#2F4638]/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      
      <div className="relative w-full aspect-square overflow-hidden bg-stone-50 flex items-center justify-center">
        {imgPath ? (
          <img src={imgPath} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"/>
        ) : (
          <ImageIcon size={48} className="text-stone-300" />
        )}

        <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10 shadow-sm ${badgeStyle}`}>
          {badgeText}
        </span>

        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-red-500 transition-all hover:scale-110 z-10 shadow-sm">
          <Heart size={18} strokeWidth={2.5} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#B08D63] text-[#B08D63]" />
            <span className="text-xs font-bold text-stone-500">5.0</span>
          </div>
          <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">Stok: {product.stok}</span>
        </div>
        
        <h3 className="text-sm font-extrabold text-[#2F4638] mb-3 group-hover:text-[#B08D63] transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        {/* Kontainer Harga dan Tombol Beli */}
        <div className="mt-auto pt-2">
          <p className="text-[#B08D63] font-extrabold text-lg mb-4">{formattedPrice}</p>
          
          {/* LOGIC TOMBOL ADD TO CART (Selalu Kelihatan di Bawah) */}
          {cartQty > 0 ? (
            <div className="flex items-center justify-between bg-stone-50 text-[#2F4638] font-extrabold text-sm border border-[#B08D63] rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => updateQty(product.id, -1)} className="flex-1 py-2.5 flex justify-center bg-white hover:bg-red-50 hover:text-red-500 transition-colors">
                <Minus size={18} strokeWidth={3} />
              </button>
              <span className="w-12 text-center text-base font-black">{cartQty}</span>
              <button onClick={() => updateQty(product.id, 1)} className="flex-1 py-2.5 flex justify-center bg-[#B08D63] text-white hover:bg-[#967651] transition-colors">
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => updateQty(product.id, 1)}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#B08D63] font-extrabold text-sm py-2.5 rounded-xl hover:bg-[#B08D63] hover:text-white border-2 border-[#B08D63] transition-all"
            >
              <ShoppingBag size={18} strokeWidth={2.5} /> Beli
            </button>
          )}
        </div>
      </div>
    </div>
  );
}