import { Package, Users, Palette, Star } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    { icon: Package, val: "48+", label: "Produk Tersedia" },
    { icon: Users, val: "1000+", label: "Pelanggan Puas" },
    { icon: Palette, val: "100%", label: "Bisa Custom" },
    { icon: Star, val: "4.9", label: "Rating Pelanggan" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm mb-12">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="text-[#c08457] bg-[#f8f1eb] p-3 rounded-xl"><s.icon size={24} /></div>
          <div>
            <h4 className="font-extrabold text-stone-900">{s.val}</h4>
            <p className="text-xs text-stone-500 font-medium">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}