// app/components/ui/PembelajaranPopuler.tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  X,
  Globe,
  Code,
  Tangent,
  FolderCode,
  CodeXml,
  Bot,
} from "lucide-react";

type Props = {
  selectedClass: string;
  tempSelected: string;
  setTempSelected: (v: string) => void;
  setSelectedClass: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onOpenSubject: (slug: string) => void;
};

export default function PembelajaranPopuler({
  selectedClass,
  tempSelected,
  setTempSelected,
  setSelectedClass,
  searchTerm,
  setSearchTerm,
  onOpenSubject,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const subjectsByClass: Record<string, string[]> = {
    "10": ["Dasar Desain Grafis", "Pemrograman Dasar", "Komputer & Jaringan"],
    "11": ["UI/UX Design", "Animasi 2D", "Jaringan Lanjut"],
    "12": ["Desain 3D", "Internet of Things", "Keamanan Jaringan"],
    "13": ["Proyek Akhir", "Kewirausahaan", "Pengembangan Produk"],
  };

  // cards data (dummy)
  const cards = [
    {
      title: "Chat Collect",
      desc: "SaaS yang membantu mengumpulkan email pengguna GPT.",
      image: "https://picsum.photos/600/400?random=1",
      link: "https://chatcollect.com",
      stack: ["Next.js", "Typescript", "PostgreSQL", "Prisma"],
      button: {
        icon: Code,
        subject: "Pemrograman Dasar",
        slug: "pemrograman-dasar",
      },
    },
    {
      title: "Edu Vision",
      desc: "Platform interaktif untuk materi pembelajaran visual.",
      image: "https://picsum.photos/600/400?random=2",
      link: "#",
      stack: ["React", "Node.js", "MongoDB", "Shadcn UI"],
      button: {
        icon: Tangent,
        subject: "Dasar Desain Grafis",
        slug: "dasar-desain-grafis",
      },
    },
    {
      title: "DesignFlow",
      desc: "Alat bantu kolaborasi desainer dengan real-time feedback.",
      image: "https://picsum.photos/600/400?random=3",
      link: "#",
      stack: ["Figma API", "Next.js", "Framer Motion"],
      button: {
        icon: FolderCode,
        subject: "SaaS/Web Development",
        slug: "web-development",
      },
    },
    {
      title: "CodeQuest",
      desc: "Game edukatif untuk belajar coding dari dasar.",
      image: "https://picsum.photos/600/400?random=4",
      link: "#",
      stack: ["React", "Supabase", "TailwindCSS"],
      button: {
        icon: CodeXml,
        subject: "Pemrograman Dasar",
        slug: "pemrograman-dasar",
      },
    },
    {
      title: "NetworkPro",
      desc: "Simulasi jaringan sederhana untuk siswa SMK.",
      image: "https://picsum.photos/600/400?random=5",
      link: "#",
      stack: ["Python", "FastAPI", "PostgreSQL"],
      button: {
        icon: Globe,
        subject: "Komputer & Jaringan",
        slug: "komputer-dan-jaringan",
      },
    },
    {
      title: "SmartClass",
      desc: "Sistem pembelajaran berbasis IoT untuk sekolah digital.",
      image: "https://picsum.photos/600/400?random=6",
      link: "#",
      stack: ["IoT", "MQTT", "Node.js"],
      button: {
        icon: Bot,
        subject: "Internet of Things",
        slug: "internet-of-things",
      },
    },
  ];

  const cardWidth = 280;
  const handleScroll = (dir: "left" | "right") => {
    const newIndex =
      dir === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(cards.length - 3, activeIndex + 1);
    setActiveIndex(newIndex);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Filter cards by searchTerm (search both title and button.subject)
  const filteredCards = cards.filter((c) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.button.subject.toLowerCase().includes(q)
    );
  });

  const ClassCard = ({ kelas, mapel }: { kelas: string; mapel: string[] }) => {
    const selected = tempSelected === kelas;
    return (
      <div
        onClick={() => setTempSelected(kelas)}
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          selected
            ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
            : "border-gray-200 hover:border-blue-300"
        }`}
      >
        <p className="font-semibold text-blue-700 mb-2">Kelas {kelas}</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {mapel.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="relative w-full py-16 px-8 flex flex-col items-center bg-gray-50 pb-24">
      {/* Search Bar & Pilih Kelas */}
      <div className="flex w-full max-w-5xl justify-center mb-12">
        <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-3 w-full max-w-3xl border border-gray-100">
          <input
            type="text"
            placeholder="Mau belajar apa hari ini?...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-500" />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="ml-4 bg-blue-700 text-white rounded-md px-6 py-3 font-semibold hover:bg-blue-800 focus:outline-none"
        >
          Pilih Kelas
        </button>
      </div>

      {/* Judul & Carousel */}
      <div className="w-full max-w-7xl flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold leading-tight text-gray-800">
            Pembelajaran
            <br />
            <span className="text-blue-600">Terpopuler</span>
          </h2>
          <button
            onClick={() => handleScroll("left")}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ArrowLeft className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Cards */}
        <div className="flex-1 mx-8 overflow-hidden no-scrollbar">
          <div
            ref={scrollRef}
            className="flex gap-6 scroll-smooth overflow-x-auto no-scrollbar py-2"
          >
            {filteredCards.map((card, i) => {
              const Icon = card.button.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="rounded-lg bg-white text-gray-800 flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full w-[250px] flex-shrink-0"
                >
                  <a href={card.link} target="_blank" rel="noreferrer" className="block cursor-pointer">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={600}
                      height={400}
                      unoptimized
                      className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
                    />
                  </a>
                  <div className="flex flex-col px-3 py-2 flex-grow">
                    <h3 className="font-semibold tracking-tight text-base text-gray-800">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex-grow">
                      {card.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {card.stack.map((tech, j) => (
                        <div
                          key={j}
                          className="inline-flex items-center rounded-md border font-semibold bg-gray-100 text-gray-700 px-1 py-0.5 text-[10px]"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-start px-3 pb-2 pt-1">
                    <button
                      onClick={() => {
                        // buka subject sesuai slug (card.button.slug)
                        onOpenSubject(`/kelas/mapel/${card.button.slug}`);
                      }}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-3 py-1 rounded-md transition-all"
                    >
                      <Icon className="w-4 h-4" />
                      {card.button.subject}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <ArrowRight className="text-gray-600" />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        {filteredCards.slice(0, filteredCards.length - 2).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === activeIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Modal Pilih Kelas */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="bg-white rounded-2xl shadow-xl p-8 w-[520px] relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pilih Kelas</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(subjectsByClass).map(([kelas, mapel]) => (
                  <ClassCard key={kelas} kelas={kelas} mapel={mapel} />
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedClass(tempSelected);
                    setShowModal(false);
                  }}
                  className="flex-1 py-2 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-800 transition"
                >
                  Selesai
                </button>
                <button
                  onClick={() => {
                    setTempSelected(selectedClass); // reset
                    setShowModal(false);
                  }}
                  className="flex-1 py-2 border rounded-md font-semibold"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
