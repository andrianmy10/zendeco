import { Package, Users, Palette, Star } from 'lucide-react';

interface StatsBarProps {
  totalProducts: number;
  filteredCount: number;
}

export default function StatsBar({ totalProducts, filteredCount }: StatsBarProps) {
  const stats = [
    { icon: Package, val: `${totalProducts}+`, label: "Produk Tersedia" },
    { icon: Package, val: `${filteredCount}`, label: "Hasil Pencarian" }, // Nampilin jumlah hasil filter
    { icon: Palette, val: "100%", label: "Kualitas Premium" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-9 bg-white p-8 rounded-[2rem] border border-[#F1EFE7] shadow-sm mb-12">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="text-[#2F4638] bg-[#F1EFE7] p-3.5 rounded-2xl">
            <s.icon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-extrabold text-[#2F4638] text-xl">{s.val}</h4>
            <p className="text-[11px] text-[#B08D63] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}