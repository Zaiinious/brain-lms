"use client";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Dialog initialFocus={closeButtonRef} open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <Dialog.Panel className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-xl font-bold text-center flex-1">Semua Pelajaran</Dialog.Title>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Tutup dialog"
            className="ml-4 text-gray-500 hover:text-gray-700 rounded-full p-1"
          >
            <X size={18} />
          </button>
        </div>

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

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 text-center bg-blue-600 text-white rounded-xl font-semibold"
            aria-label="Tutup"
          >
            Tutup
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
