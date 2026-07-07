import Image from 'next/image';

export default function FeaturedProduct() {
  return (
    <div className="bg-[#f8f1eb] p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center gap-10 mb-12 border border-[#c08457]/10">
      
      {/* Bagian ini yang kita update:
        - text-center & items-center (buat mobile)
        - md:text-left & md:items-start (buat desktop)
      */}
      <div className="flex-1 space-y-4 flex flex-col items-center text-center md:items-start md:text-left">
        <span className="text-[#c08457] text-xs font-bold uppercase tracking-[0.2em]">Produk Unggulan</span>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Jam Dinding Coffee Vintage</h2>
        
        <p className="text-stone-600">
          Perpaduan kayu berkualitas dengan desain vintage yang elegan, cocok untuk ruangan minimalis.
        </p>
        
        <p className="text-xl font-extrabold text-[#c08457]">Mulai dari Rp120.000</p>
        
        <button className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#c08457] transition-all">
          Lihat Detail
        </button>
      </div>
      
      {/* Image Container */}
      <div className="w-full md:w-1/3 relative">
        <Image 
          src="/assets/img/about2.png"
          alt="Featured Product"
          width={600}
          height={600}
          className="rounded-2xl shadow-lg w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}