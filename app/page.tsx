"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroBanner from "./components/ui/HeroBanner";
import KompetensiKeahlian from "./components/ui/KompetensiKeahlian";
import PembelajaranPopuler from "./components/ui/PembelajaranPopuler";
import MataPelajaran from "./components/ui/MataPelajaran";
import PendidikTerbaik from "./components/ui/PendidikTerbaik";
import { Testimoni } from "./components/ui/Testimoni";

export default function Page() {
  const [selectedClass, setSelectedClass] = useState<string>("10");
  const [tempClass, setTempClass] = useState<string>("10");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const router = useRouter();

  // ketika user memilih subject dari modal atau klik card
  const handleOpenSubject = (slug: string) => {
    setSelectedSubject(slug);
    // navigate ke page mapel (pastikan route ada /mapel/[slug]/page.tsx)
    router.push(`/mapel/${slug}`);
  };

  return (
    <>
      <HeroBanner />
      <KompetensiKeahlian />
      <PembelajaranPopuler
        selectedClass={selectedClass}
        tempSelected={tempClass}
        setTempSelected={setTempClass}
        setSelectedClass={setSelectedClass}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenSubject={handleOpenSubject}
      />
      <MataPelajaran
        selectedClass={selectedClass}
        searchTerm={searchTerm}
        onOpenSubject={handleOpenSubject}
      />
      <PendidikTerbaik />
      <Testimoni />
    </>
  );
}
