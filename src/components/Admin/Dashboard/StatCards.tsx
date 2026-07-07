import { ShoppingBag, Wallet, Box } from 'lucide-react';

export default function StatCards() {
  // Dummy data disesuaikan dengan e-commerce (Total Pesanan, Pendapatan, Produk Terjual)
  const stats = [
    {
      title: 'TOTAL PESANAN',
      value: '266',
      unit: 'Pesanan',
      icon: ShoppingBag,
      iconColor: 'text-[#2F4638]',      // Hijau Gelap
      iconBg: 'bg-[#2F4638]/10',        
      decorColor: 'bg-[#2F4638]/5',
    },
    {
      title: 'TOTAL PENDAPATAN',
      value: '15.4',
      unit: 'Juta',
      icon: Wallet,
      iconColor: 'text-[#B08D63]',      // Cokelat Muda
      iconBg: 'bg-[#B08D63]/10',
      decorColor: 'bg-[#B08D63]/10',
    },
    {
      title: 'PRODUK TERJUAL',
      value: '1.204',
      unit: 'Item',
      icon: Box,
      iconColor: 'text-[#2F4638]',      // Hijau Gelap
      iconBg: 'bg-[#2F4638]/10',
      decorColor: 'bg-[#2F4638]/5',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="relative bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-[#F1EFE7] overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          {/* Aksen ornamen di pojok kanan atas (mirip referensi gambar) */}
          <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${stat.decorColor} transition-transform duration-500 group-hover:scale-125`}></div>

          {/* Icon & Title */}
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
              <stat.icon size={22} strokeWidth={2.5} />
            </div>
            <h3 className="text-xs font-extrabold text-stone-500 tracking-[0.1em] uppercase">
              {stat.title}
            </h3>
          </div>

          {/* Value & Unit */}
          <div className="flex items-baseline gap-2 relative z-10">
            <p className="text-4xl lg:text-5xl font-extrabold text-[#2F4638] tracking-tight">
              {stat.value}
            </p>
            <span className="text-sm font-bold text-[#B08D63]">
              {stat.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}