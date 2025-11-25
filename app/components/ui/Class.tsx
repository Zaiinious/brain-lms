"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { kelasList, mapelByKelas } from "@/data/kelas-mapel";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Lightbulb, Target } from "lucide-react";

export default function KelasPage() {
  const router = useRouter();
  const [selectedKelas, setSelectedKelas] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const selectedMapel = useMemo(() => {
    return selectedKelas !== null ? mapelByKelas[selectedKelas] : [];
  }, [selectedKelas]);

  const handleSelectClass = (kelasId: number) => {
    setSelectedKelas(kelasId);
    setShowModal(false);
  };

  const handleOpenMapel = (slug: string) => {
    router.push(`/kelas/mapel/${slug}`);
  };

  const selectedKelasData = kelasList.find((k) => k.id === selectedKelas);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Kelas & Pembelajaran</h1>
            <p className="max-w-3xl mx-auto text-lg text-blue-100 leading-relaxed">
              Akses seluruh mata pelajaran sesuai jenjang kelasmu. Materi disusun secara terstruktur agar proses
              belajar menjadi lebih mudah, terarah, dan menyenangkan dengan bimbingan guru profesional.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        {/* FEATURES SECTION */}
        {!selectedKelas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Materi Berkualitas</h3>
              <p className="text-gray-600">Materi pembelajaran dirancang oleh guru berpengalaman dan disesuaikan dengan kurikulum terkini.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Metode Interaktif</h3>
              <p className="text-gray-600">Pembelajaran interaktif dengan video, kuis, dan studi kasus yang relevan dengan industri.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hasil Terukur</h3>
              <p className="text-gray-600">Pantau progress belajar dengan sistem penilaian yang transparan dan feedback real-time.</p>
            </div>
          </motion.div>
        )}

        {/* HEADER & BUTTON */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Pilih Kelas</h2>
            <p className="text-gray-600 mt-2">Pilih tingkat kelas untuk melihat semua mata pelajaran yang tersedia</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition font-semibold"
          >
            {selectedKelas ? `Ubah Kelas (${selectedKelasData?.name})` : "Pilih Kelas"}
          </motion.button>
        </div>

        {/* NO CLASS SELECTED */}
        {selectedKelas === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-12 text-center shadow-md border border-gray-100 mb-8"
          >
            <div className="mb-4">
              <BookOpen className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Belum Ada Kelas yang Dipilih</h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              Silakan pilih kelas terlebih dahulu untuk melihat daftar mata pelajaran yang tersedia. 
              Setiap kelas memiliki materi pembelajaran yang dirancang khusus sesuai tingkat kesulitan dan kompetensi.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold inline-block"
            >
              Pilih Kelas Sekarang
            </motion.button>
          </motion.div>
        )}

        {/* MAPEL GRID */}
        <AnimatePresence>
          {selectedKelas !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mata Pelajaran - {selectedKelasData?.name}
                </h3>
                <p className="text-gray-600">{selectedKelasData?.description}</p>
              </div>

              {selectedMapel.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {selectedMapel.map((mapel, index) => (
                    <motion.div
                      key={mapel.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => handleOpenMapel(mapel.slug)}
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition h-full cursor-pointer group">
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                          <Image
                            src={mapel.img}
                            alt={mapel.name}
                            width={400}
                            height={250}
                            unoptimized
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        <div className="p-4">
                          <div className="flex items-start gap-3 mb-2">
                            {mapel.icon && (
                              <Image
                                src={mapel.icon}
                                alt={mapel.name}
                                width={32}
                                height={32}
                                className="w-8 h-8"
                              />
                            )}
                            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                              {mapel.name}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-500">Klik untuk lihat detail materi</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
                  <p className="text-gray-700">
                    <strong>⚠️ Info:</strong> Tidak ada mata pelajaran yang tersedia untuk kelas ini saat ini.
                  </p>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 rounded-xl p-6 border border-blue-200"
              >
                <p className="text-gray-700">
                  <strong>💡 Tips:</strong> Materi diperbarui secara berkala untuk memastikan kamu selalu mendapat pembelajaran terkini dan relevan dengan kebutuhan industri. Gunakan fitur pencarian untuk menemukan topik spesifik yang ingin dipelajari.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL KELAS */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setShowModal(false)}
              >
                <X size={24} className="text-gray-600" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pilih Tingkat Kelas</h3>

              <div className="space-y-3">
                {kelasList.map((kelas) => (
                  <motion.button
                    key={kelas.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectClass(kelas.id)}
                    className={`w-full p-4 rounded-xl text-left transition duration-200 ${
                      selectedKelas === kelas.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <div className="font-semibold">{kelas.name}</div>
                    <div className={`text-sm ${selectedKelas === kelas.id ? "text-blue-100" : "text-gray-600"}`}>
                      {kelas.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
