"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  bio?: string;
  email?: string;
  phone?: string;
  experience?: number;
  rating?: number;
  students?: number;
};

const TEACHERS: Teacher[] = [
  {
    id: "dahlan",
    name: "Ahmad Dahlan, S.Ag",
    subject: "Pendidikan Agama Islam",
    avatar: "https://picsum.photos/seed/dahlan/200/200",
    bio: "Pengajar berpengalaman di bidang agama dan karakter, fokus pada pembentukan sikap disiplin.",
    email: "ahmad.dahlan@smktibazma.sch.id",
    phone: "0812-3456-7890",
    experience: 8,
    rating: 4.8,
    students: 156,
  },
  {
    id: "mimah",
    name: "Fatimah Azzahra, S.Pi",
    subject: "Dasar Desain Grafis",
    avatar: "https://picsum.photos/seed/mimah/200/200",
    bio: "Instruktur desain grafis dengan portofolio proyek kreatif dan pengalaman pengajaran di SMK.",
    email: "fatimah.azzahra@smktibazma.sch.id",
    phone: "0813-9876-5432",
    experience: 6,
    rating: 4.9,
    students: 142,
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    subject: "Pemrograman Dasar",
    avatar: "https://picsum.photos/seed/jordan/200/200",
    bio: "Pengembang dan pengajar yang menyukai pendidikan berbasis proyek.",
    email: "jordan.lee@example.com",
    experience: 5,
    rating: 4.7,
    students: 198,
  },
  {
    id: "siti",
    name: "Siti Nurhaliza, S.Pd",
    subject: "Matematika",
    avatar: "https://picsum.photos/seed/siti/200/200",
    bio: "Spesialis matematika dengan metode pengajaran interaktif dan menyenangkan.",
    email: "siti.nurhaliza@smktibazma.sch.id",
    phone: "0814-5678-9012",
    experience: 10,
    rating: 4.9,
    students: 167,
  },
  {
    id: "budi",
    name: "Budi Santoso, S.Kom",
    subject: "Basis Data",
    avatar: "https://picsum.photos/seed/budi/200/200",
    bio: "Expert dalam sistem database dan SQL dengan pengalaman industri.",
    email: "budi.santoso@smktibazma.sch.id",
    phone: "0815-1234-5678",
    experience: 12,
    rating: 4.8,
    students: 125,
  },
  {
    id: "rina",
    name: "Rina Wijaya, S.Sn",
    subject: "Desain Grafis",
    avatar: "https://picsum.photos/seed/rina/200/200",
    bio: "Desainer kreatif dengan portofolio internasional dan passion mengajar.",
    email: "rina.wijaya@smktibazma.sch.id",
    phone: "0816-9876-5432",
    experience: 7,
    rating: 4.6,
    students: 89,
  },
];

export default function GuruPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = useMemo(
    () => Array.from(new Set(TEACHERS.map((t) => t.subject))),
    []
  );

  const filteredTeachers = useMemo(() => {
    return TEACHERS.filter((teacher) => {
      const matchesSubject = !selectedSubject || teacher.subject === selectedSubject;
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Tim Pengajar Profesional</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Belajar dari instruktur bersertifikat dengan pengalaman industri yang luas. 
              Kami berkomitmen untuk kesuksesan pembelajaran Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* SEARCH AND FILTER (dropdown) */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Cari guru atau mata pelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm transition text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="md:col-span-1">
            <label className="sr-only">Filter mata pelajaran</label>
            <select
              value={selectedSubject ?? ""}
              onChange={(e) => setSelectedSubject(e.target.value || null)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 focus:outline-none shadow-sm"
            >
              <option value="">Semua Mata Pelajaran</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Menampilkan {filteredTeachers.length} dari {TEACHERS.length} guru</p>
        </div>

        {/* PROFILE CARD GRID */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher, idx) => (
              <motion.article
                key={teacher.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ translateY: -6 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-50">
                    <Image src={teacher.avatar} alt={teacher.name} width={80} height={80} className="object-cover" unoptimized />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{teacher.subject}</p>
                    {teacher.rating && (
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-amber-800 font-semibold">
                        {teacher.rating} ★
                      </div>
                    )}
                  </div>
                </div>

                {teacher.bio && <p className="text-sm text-gray-600 mt-4 line-clamp-3">{teacher.bio}</p>}

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {teacher.experience && <span>{teacher.experience} tahun pengalaman</span>}
                    {teacher.students && <span className="text-gray-400">•</span>}
                    {teacher.students && <span>{teacher.students} siswa</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    {teacher.email && (
                      <a href={`mailto:${teacher.email}`} className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">Email</a>
                    )}
                    {teacher.phone && (
                      <a href={`tel:${teacher.phone}`} className="px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm">Telepon</a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-600">Tidak ada guru yang sesuai dengan pencarian.</div>
        )}
      </div>
    </main>
  );
}
