"use client";
import Link from "next/link";
import Image from "next/image";

interface Subject {
  name: string;
  slug: string;
  icon: string;
}

interface SubjectGridProps {
  subjects?: Subject[];
  onOpenAll?: () => void;
}

export default function SubjectGrid({ subjects = [], onOpenAll }: SubjectGridProps) {
  const preview = subjects.slice(0, 7);

  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-2">
      {preview.map((s) => (
        <Link
          key={s.name}
          href={`/kelas/mapel/${s.slug}`}
          className="w-28 shrink-0 p-4 bg-white rounded-2xl shadow-sm flex flex-col items-center"
        >
          <Image src={s.icon} alt={s.name} width={48} height={48} unoptimized className="w-12 h-12" />
          <span className="mt-2 text-sm text-gray-700">{s.name}</span>
        </Link>
      ))}

      {/* card terakhir = semua pelajaran */}
      <button
        onClick={onOpenAll}
        className="w-28 shrink-0 p-4 bg-white rounded-2xl shadow-sm flex flex-col items-center"
      >
        <Image src="https://img.icons8.com/color/96/menu.png" alt="Semua" width={48} height={48} unoptimized className="w-12 h-12" />
        <span className="mt-2 text-sm text-gray-700">Semua Pelajaran</span>
      </button>
    </div>
  );
}
