"use client";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

interface Subject {
  name: string;
  slug: string;
  icon: string;
}

interface SubjectModalProps {
  open: boolean;
  onClose: () => void;
  subjects: Subject[];
}

export default function SubjectModal({ open, onClose, subjects }: SubjectModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <Dialog.Panel className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
        <Dialog.Title className="text-xl font-bold mb-4 text-center">Semua Pelajaran</Dialog.Title>

        <div className="grid grid-cols-2 gap-4">
          {(subjects ?? []).map((s) => (
            <Link
              key={s.name}
              href={`/kelas/mapel/${s.slug}`}
              className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-xl transition"
            >
              <Image src={s.icon} alt={s.name} width={56} height={56} unoptimized className="w-14 h-14" />
              <span className="mt-2 text-sm font-medium">{s.name}</span>
            </Link>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-center bg-blue-600 text-white rounded-xl font-semibold"
        >
          Tutup
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
