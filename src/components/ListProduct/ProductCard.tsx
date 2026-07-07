import { Heart, ShoppingBag, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  img: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  'Terlaris': 'bg-[#8d6649] text-white',
  'Bisa Custom': 'bg-stone-900 text-white',
  'Baru': 'bg-emerald-600 text-white',
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 transition-all duration-500">
      
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-stone-50">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10 ${badgeStyles[product.badge] || 'bg-[#8d6649] text-white'}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-[#8d6649] transition-all hover:scale-110 z-10 shadow-sm"
          aria-label="Wishlist"
        >
          <Heart size={18} />
        </button>

        {/* Quick Add Button */}
        <button className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-2 bg-white text-stone-900 font-bold text-sm py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-[#8d6649] hover:text-white z-10 border-t border-stone-100">
          <ShoppingBag size={18} />
          Tambah Cepat
        </button>
      </div>
      
      {/* Info Container */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-[#8d6649] text-[#8d6649]" />
          <span className="text-xs font-bold text-stone-600">{product.rating}</span>
        </div>

        <h3 className="text-base font-bold text-stone-900 mb-2 group-hover:text-[#8d6649] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <p className="text-[#8d6649] font-extrabold text-lg">
            {product.price}
          </p>
          {product.originalPrice && (
            <p className="text-stone-400 text-xs line-through font-medium">
              {product.originalPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}