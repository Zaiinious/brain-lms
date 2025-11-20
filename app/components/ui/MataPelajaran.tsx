// app/components/ui/MataPelajaran.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

type Props = {
  selectedClass: string;
  searchTerm: string;
  onOpenSubject: (slug: string) => void;
};

const dataPerClass: Record<
  string,
  { name: string; icon: string; slug: string; color?: string }[]
> = {
  "10": [
    { name: "PWPB", icon: "https://img.icons8.com/color/96/code.png", slug: "pwpb" },
    { name: "PBO", icon: "https://img.icons8.com/color/96/code-file.png", slug: "pbo" },
    { name: "Matematika", icon: "https://img.icons8.com/color/96/calculator.png", slug: "matematika" },
    { name: "Basis Data", icon: "https://img.icons8.com/color/96/database.png", slug: "basis-data" },
    { name: "RPL", icon: "https://img.icons8.com/color/96/software.png", slug: "rpl" },
    { name: "PKK", icon: "https://img.icons8.com/color/96/cooking.png", slug: "pkk" },
    { name: "Bahasa Inggris", icon: "https://img.icons8.com/color/96/english.png", slug: "bahasa-inggris" },
    { name: "P5", icon: "https://img.icons8.com/color/96/education.png", slug: "p5" },
  ],
  "11": [
    { name: "UI/UX", icon: "https://img.icons8.com/color/96/design.png", slug: "ui-ux" },
    { name: "Animasi 2D", icon: "https://img.icons8.com/color/96/animation.png", slug: "animasi-2d" },
    { name: "Jaringan Lanjut", icon: "https://img.icons8.com/color/96/network.png", slug: "jaringan-lanjut" },
  ],
  "12": [
    { name: "Desain 3D", icon: "https://img.icons8.com/color/96/3d-print.png", slug: "desain-3d" },
    { name: "IoT", icon: "https://img.icons8.com/color/96/iot.png", slug: "iot" },
    { name: "Keamanan Jaringan", icon: "https://img.icons8.com/color/96/security-checked.png", slug: "keamanan-jaringan" },
  ],
  "13": [
    { name: "Proyek Akhir", icon: "https://img.icons8.com/color/96/project.png", slug: "proyek-akhir" },
    { name: "Kewirausahaan", icon: "https://img.icons8.com/color/96/business.png", slug: "kewirausahaan" },
    { name: "Pengembangan Produk", icon: "https://img.icons8.com/color/96/product.png", slug: "pengembangan-produk" },
  ],
};

export default function MataPelajaran({ selectedClass, searchTerm, onOpenSubject }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const subjects = dataPerClass[selectedClass] || [];

  // realtime filter by searchTerm
  const filtered = searchTerm
    ? subjects.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : subjects;

  useEffect(() => {
    // jika search hanya menghasilkan 1, auto open subject (optional)
    if (searchTerm && filtered.length === 1) {
      onOpenSubject(filtered[0].slug);
    }
  }, [searchTerm, filtered, onOpenSubject]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Mata Pelajaran</h3>
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
          >
            <Menu className="w-4 h-4" />
            Semua Pelajaran
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto py-4 px-2">
          {filtered.length === 0 && (
            <div className="text-gray-500">Tidak ada mapel cocok.</div>
          )}

          {filtered.map((s) => (
            <motion.button
              key={s.slug}
              onClick={() => onOpenSubject(s.slug)}
              whileHover={{ scale: 1.03 }}
              className="w-36 shrink-0 p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-md
              flex flex-col items-center hover:shadow-xl transition-all"
            >
              <img src={s.icon} alt={s.name} className="w-12 h-12" />
              <span className="mt-3 text-sm text-gray-800 font-semibold text-center">{s.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[640px] max-w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h4 className="text-lg font-semibold mb-4">Semua Pelajaran - Kelas {selectedClass}</h4>

              <div className="grid grid-cols-3 gap-4">
                {subjects.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => {
                      setOpenModal(false);
                      onOpenSubject(s.slug);
                    }}
                    className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img src={s.icon} alt={s.name} className="w-12 h-12" />
                    <span className="mt-2 text-sm font-medium">{s.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
