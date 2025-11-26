"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminIndex() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('blms_admin');
      if (!raw) return router.push('/admin/login');
      setAdmin(JSON.parse(raw));
    } catch (err) {
      router.push('/admin/login');
    }
  }, [router]);

  if (!admin) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={() => { localStorage.removeItem('blms_admin'); router.push('/admin/login'); }} className="px-3 py-1 bg-red-600 text-white rounded">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/siswa" className="p-4 bg-white rounded shadow hover:shadow-md">Siswa</Link>
          <Link href="/admin/guru" className="p-4 bg-white rounded shadow hover:shadow-md">Guru</Link>
          <Link href="/admin/mapel" className="p-4 bg-white rounded shadow hover:shadow-md">Mapel</Link>
          <Link href="/admin/kelas" className="p-4 bg-white rounded shadow hover:shadow-md">Kelas</Link>
        </div>
      </div>
    </main>
  );
}
