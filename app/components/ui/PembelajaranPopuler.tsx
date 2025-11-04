"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const data = [
  { id: 1, title: "Desain Grafis Digital", img: "/sample1.png" },
  { id: 2, title: "Pemrograman Web Dasar", img: "/sample2.png" },
  { id: 3, title: "Jaringan Komputer", img: "/sample3.png" },
  { id: 4, title: "Animasi 3D", img: "/sample4.png" },
];

export default function PembelajaranPopuler() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const interval = setInterval(() => emblaApi?.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Pembelajaran Terpopuler</h3>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_25%] bg-white rounded-lg shadow p-4"
              >
                <div className="h-32 bg-gray-200 mb-3 rounded-lg" />
                <p className="font-medium text-gray-700">{item.title}</p>
                <button className="mt-2 text-sm text-blue-600">Lihat Materi</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
