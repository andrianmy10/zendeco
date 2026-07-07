"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  { id: 1, name: "Andrian Maulana", rating: 5, comment: "Hasil jam custom-nya rapi banget! Bener-bener estetik buat dekorasi rumah." },
  { id: 2, name: "Chehra", rating: 5, comment: "Pelayanannya cepet, dan hasilnya jauh lebih bagus dari ekspektasi. Rekomen banget!" },
  { id: 3, name: "Budi Santoso", rating: 4, comment: "Kualitas laminasinya oke, packing aman banget. Next bakal order lagi." },
  { id: 4, name: "Siti Aminah", rating: 5, comment: "Suka banget sama desainnya, minimalis dan elegan. Makasih Zendeco!" },
  { id: 5, name: "Rizky Pratama", rating: 5, comment: "Respon admin ramah, pengerjaan custom stiker juga cepet banget." },
];

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

export default function RatingView() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="ulasan" className="py-24 bg-[#f7f1eb]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between mb-16 gap-8">
            
            {/* Text: Centered on mobile, Left on desktop */}
            <div className="text-center md:text-left">
                <span className="text-[#c08457] uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
                Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
                Apa Kata Mereka?
                </h2>
            </div>
            
            {/* Buttons: Centered on mobile, Right on desktop */}
            <div className="flex gap-3 justify-center md:justify-end w-full md:w-auto">
                <button 
                onClick={scrollPrev} 
                className="w-12 h-12 rounded-full border border-[#c08457]/20 text-[#c08457] hover:bg-[#c08457] hover:text-white transition-all flex items-center justify-center"
                >
                <ChevronLeft size={20}/>
                </button>
                <button 
                onClick={scrollNext} 
                className="w-12 h-12 rounded-full border border-[#c08457]/20 text-[#c08457] hover:bg-[#c08457] hover:text-white transition-all flex items-center justify-center"
                >
                <ChevronRight size={20}/>
                </button>
            </div>
            </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
            {/* Hapus gap-6, ganti jadi -ml-6 (negative margin kiri) */}
            <div className="flex -ml-6"> 
                {reviews.map((review) => (
                // Tambahin pl-6 (padding-left) buat jadi jarak antar card
                <div key={review.id} className="pl-6 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0">
                    <div className="bg-white p-8 rounded-3xl h-full relative border border-stone-100 flex flex-col justify-between hover:shadow-xl hover:shadow-[#c08457]/5 transition-all duration-300">
                    
                    {/* Quote Icon Transparan */}
                    <Quote className="absolute top-6 right-6 text-[#c08457]/5" size={48} />
                    
                    <div>
                        <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < review.rating ? "#c08457" : "none"} className={i < review.rating ? "text-[#c08457]" : "text-stone-300"} />
                        ))}
                        </div>
                        <p className="text-stone-700 font-medium leading-relaxed italic mb-8">"{review.comment}"</p>
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-[#f2dfd3] flex items-center justify-center font-bold text-[#c08457] text-sm">
                        {getInitials(review.name)}
                        </div>
                        <div>
                        <h4 className="font-bold text-stone-900 text-sm">{review.name}</h4>
                        <span className="text-[10px] text-[#c08457] font-bold uppercase tracking-wider">Customer</span>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, index) => (
            <button 
              key={index} 
              className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-8 bg-[#c08457]' : 'w-2 bg-stone-300'}`} 
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}