import { MessageSquare, Star } from 'lucide-react';

export default function RecentReviews() {
  // Dummy data ulasan terbaru (sinkron dengan testimonial di landing page)
  const reviews = [
    {
      id: 1,
      name: 'Siti Aminah',
      initials: 'SA',
      rating: 5,
      comment: 'Suka banget sama desainnya, minimalis dan elegan. Makasih Zendeco!',
    },
    {
      id: 2,
      name: 'Rizky Pratama',
      initials: 'RP',
      rating: 5,
      comment: 'Respon admin ramah, pengerjaan custom stiker juga cepet banget.',
    },
    {
      id: 3,
      name: 'Andrian Maulana',
      initials: 'AM',
      rating: 5,
      comment: 'Hasil jam custom-nya rapi banget! Bener-bener estetik buat dekorasi rumah.',
    },
  ];

  return (
    <div className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-[#F1EFE7] flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F1EFE7] flex items-center justify-center text-[#B08D63] shrink-0">
            <MessageSquare size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-extrabold text-[#2F4638] text-lg">Ulasan Terbaru</h2>
            <p className="text-xs font-semibold text-[#B08D63] mt-1">Feedback dan kepuasan dari pelanggan.</p>
          </div>
        </div>

        {/* Tombol Lihat Semua */}
        <button className="text-xs font-extrabold text-[#2F4638] bg-[#F1EFE7] hover:bg-[#B08D63] hover:text-white px-4 py-2 rounded-xl transition-all duration-300">
          Lihat Semua
        </button>
      </div>

      {/* List Ulasan */}
      <div className="space-y-5 overflow-y-auto pr-1 flex-1 max-h-[360px] scrollbar-thin">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 items-start group">
            
            {/* Avatar Lingkaran Inisial */}
            <div className="w-10 h-10 rounded-full bg-[#F1EFE7] text-[#B08D63] font-extrabold text-xs flex items-center justify-center shrink-0 border border-white shadow-sm group-hover:bg-[#2F4638] group-hover:text-white transition-colors duration-300">
              {review.initials}
            </div>

            {/* Konten Ulasan */}
            <div className="flex-1 bg-stone-50/60 group-hover:bg-stone-50 p-4 rounded-2xl border border-[#F1EFE7] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h4 className="text-sm font-extrabold text-[#2F4638]">
                  {review.name}
                </h4>
                
                {/* Rating Bintang */}
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#B08D63] text-[#B08D63]" />
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-stone-600 font-medium leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}