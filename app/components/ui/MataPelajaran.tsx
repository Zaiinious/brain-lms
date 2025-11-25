// app/components/ui/MataPelajaran.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { mapelByKelas } from "@/data/kelas-mapel";
import Image from "next/image";

type Props = {
  selectedClass: string;
  searchTerm: string;
  onOpenSubject: (slug: string) => void;
};

export default function MataPelajaran({ selectedClass, searchTerm, onOpenSubject }: Props) {
  const [openModal, setOpenModal] = useState(false);
  
  // Get subjects from shared data
  const classId = parseInt(selectedClass);
  const subjects = useMemo(() => mapelByKelas[classId] || [], [classId]);

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
              onClick={() => onOpenSubject(`/kelas/mapel/${s.slug}`)}
              whileHover={{ scale: 1.03 }}
              className="w-36 shrink-0 p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-md
              flex flex-col items-center hover:shadow-xl transition-all"
            >
              <Image src={s.icon || ""} alt={s.name} width={48} height={48} unoptimized className="w-12 h-12" />
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
                    <Image src={s.icon || ""} alt={s.name} width={48} height={48} unoptimized className="w-12 h-12" />
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
