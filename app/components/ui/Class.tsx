"use client";

import { useState } from "react";
import { ServiceCard } from "@/components/service-card";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function KelasPage() {
  const kelasList = [10, 11, 12, 13];

  const mapelData = {
    10: [
      {
        title: "Matematika",
        imgSrc: "illustrations/webdev.png",
        imgAlt: "math illustration",
        variant: "red",
      },
      {
        title: "Bahasa Indonesia",
        imgSrc: "https://picsum.photos/seed/indo/300/200",
        imgAlt: "indo illustration",
        variant: "default",
      },
    ],
    11: [
      {
        title: "Pemrograman Web",
        imgSrc: "https://picsum.photos/seed/web/300/200",
        imgAlt: "web illustration",
        variant: "blue",
      },
      {
        title: "Basis Data",
        imgSrc: "https://picsum.photos/seed/db/300/200",
        imgAlt: "database illustration",
        variant: "gray",
      },
    ],
    12: [
      {
        title: "Jaringan Komputer",
        imgSrc: "https://picsum.photos/seed/network/300/200",
        imgAlt: "network",
        variant: "red",
      },
      {
        title: "Keamanan Siber",
        imgSrc: "https://picsum.photos/seed/cyber/300/200",
        imgAlt: "cyber",
        variant: "default",
      },
    ],
    13: [
      {
        title: "Cloud Computing",
        imgSrc: "https://picsum.photos/seed/cloud/300/200",
        imgAlt: "cloud",
        variant: "blue",
      },
    ],
  };

  const [kelasDipilih, setKelasDipilih] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (kelas: number) => {
    setKelasDipilih(kelas);
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelas</h1>

        <button
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-zinc-800 transition"
          onClick={() => setShowModal(true)}
        >
          Pilih Kelas
        </button>
      </div>

      {/* Jika belum pilih kelas */}
      {kelasDipilih === null && (
        <p className="text-zinc-600 text-lg">
          Silakan pilih kelas terlebih dahulu.
        </p>
      )}

      {/* Jika sudah pilih kelas */}
      {kelasDipilih !== null && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Kelas {kelasDipilih}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mapelData[kelasDipilih].map((m) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ServiceCard
                  title={m.title}
                  href="#"
                  imgSrc={m.imgSrc}
                  imgAlt={m.imgAlt}
                  variant={m.variant as any}
                  className="min-h-[180px]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* POPUP SELECT KELAS */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-[300px] relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute right-3 top-3"
                onClick={() => setShowModal(false)}
              >
                <X size={22} />
              </button>

              <h3 className="text-xl font-semibold mb-4">
                Pilih Kelas
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {kelasList.map((k) => (
                  <button
                    onClick={() => handleSelect(k)}
                    key={k}
                    className="py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-center"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
