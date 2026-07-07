import { Package } from 'lucide-react';

export default function RecentOrders() {
  // Dummy data pesanan terbaru
  const orders = [
    { id: 1, name: 'Andrian Maulana', product: 'Jam Dinding Vintage Oak', time: '14:24:37' },
    { id: 2, name: 'Chehra', product: 'Dekorasi Kayu Custom HD', time: '13:15:29' },
    { id: 3, name: 'Rizky Pratama', product: 'Jam Plastik Putih Elegan', time: '11:45:10' },
    { id: 4, name: 'Siti Aminah', product: 'Jam Dinding Abstrak', time: '09:30:51' },
  ];

  return (
    <div className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-[#F1EFE7]">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#F1EFE7] flex items-center justify-center text-[#B08D63] shrink-0">
          <Package size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="font-extrabold text-[#2F4638] text-lg">Pesanan Terbaru</h2>
          <p className="text-xs font-semibold text-[#B08D63] mt-1">Berdasarkan waktu order masuk.</p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-2">
        {/* Garis Vertikal (Timeline) */}
        <div className="absolute left-[1.15rem] top-2 bottom-2 w-0.5 bg-[#F1EFE7] z-0"></div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order.id} className="relative z-10 flex items-center gap-4 group cursor-default">
              
              {/* Buletan Angka (Nomor Urut) */}
              <div className="w-9 h-9 rounded-full bg-[#F1EFE7] text-[#B08D63] border-[3px] border-white flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-[#2F4638] group-hover:text-white transition-colors duration-300">
                {index + 1}
              </div>

              {/* Info Pelanggan & Produk */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-[#2F4638] truncate group-hover:text-[#B08D63] transition-colors">
                  {order.name}
                </h4>
                <p className="text-xs font-semibold text-[#B08D63] truncate uppercase tracking-wider mt-0.5">
                  {order.product}
                </p>
              </div>

              {/* Waktu (Kanan) */}
              <div className="text-right shrink-0">
                <p className="text-xs font-extrabold text-[#2F4638]">{order.time}</p>
                <p className="text-[10px] font-bold text-stone-400">WIB</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}