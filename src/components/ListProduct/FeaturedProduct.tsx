import Image from 'next/image';

interface FeaturedProductProps {
  product: any;
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  if (!product) return null;

  // Ekstrak gambar dari JSON database (pakai gambar pertama)
  const imgPath = product.images ? JSON.parse(product.images)[0] : '/assets/img/about2.png';
  
  // Format harga Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', { 
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
  }).format(product.price);

  return (
    <div className="bg-[#F1EFE7] p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center gap-10 mb-12 border border-[#B08D63]/10">
      
      <div className="flex-1 space-y-4 flex flex-col items-center text-center md:items-start md:text-left">
        <span className="text-[#B08D63] text-xs font-bold uppercase tracking-[0.2em]">Produk Unggulan</span>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4638]">{product.name}</h2>
        
        <p className="text-stone-600 font-medium">
          {product.description || 'Perpaduan material berkualitas dengan desain yang elegan, cocok untuk ruangan Anda.'}
        </p>
        
        <p className="text-xl font-extrabold text-[#B08D63]">{formattedPrice}</p>
        
        <button className="bg-[#2F4638] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#23352a] hover:-translate-y-1 transition-all shadow-md shadow-[#2F4638]/20">
          Lihat Detail
        </button>
      </div>
      
      {/* Image Container */}
      <div className="w-full md:w-1/3 relative flex justify-center">
        <img 
          src={imgPath}
          alt={product.name}
          className="rounded-3xl shadow-lg w-full max-w-[300px] aspect-square object-cover border-4 border-white"
        />
      </div>
    </div>
  );
}