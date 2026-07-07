"use client";

import { useState } from 'react';
import Sidebar from '@/src/components/Admin/Sidebar';
import Header from '@/src/components/Admin/Header';
import Footer from '@/src/components/Admin/Footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1EFE7] flex font-sans">
      
      {/* Overlay hitam transparan pas menu mobile kebuka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Oper state ke komponen */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Wrapper Konten Utama (margin kiri disesuaikan layar) */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full transition-all duration-300">
        
        {/* Header - Oper fungsi buat buka sidebar */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 lg:p-8 w-full overflow-x-hidden">
          {children}
        </main>

        <Footer />
        
      </div>
    </div>
  );
}