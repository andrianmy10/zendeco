import { Download, Printer } from 'lucide-react';
import StatCards from './StatCards';
import RecentOrders from './RecentOrders';
import RecentReviews from './RecentReviews';

export default function DashboardView() {
  return (
    // Hapus max-w-7xl dan mx-auto, ganti p-6 jadi w-full aja
    <div className="w-full space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2F4638] flex items-center gap-2">
            Selamat Datang, Admin! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-[#B08D63] text-sm mt-1 font-semibold">
            Berikut adalah ringkasan data operasional Zendeco saat ini.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-[#B08D63] text-[#B08D63] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#F1EFE7] transition-all shadow-sm">
            <Download size={18} strokeWidth={2.5} /> 
            <span className="hidden sm:inline">Export Excel</span>
          </button>
          
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2F4638] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#23352a] transition-all shadow-md shadow-[#2F4638]/20">
            <Printer size={18} strokeWidth={2.5} /> 
            <span className="hidden sm:inline">Cetak PDF</span>
          </button>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentOrders />
        <RecentReviews />
      </div>
    </div>
  );
}