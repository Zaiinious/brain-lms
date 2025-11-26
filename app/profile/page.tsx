"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { kelasList } from "@/data/kelas-mapel";

type User = {
  id: string;
  nama: string;
  kelas: number | string;
  asal: string;
  minat: string;
  email: string;
  createdAt: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [kelasName, setKelasName] = useState<string>("");

  useEffect(() => {
    const userRaw = localStorage.getItem("blms_current_user");
    if (!userRaw) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(userRaw) as User;
      setUser(userData);

      // find kelas name
      const kelas = kelasList.find((k) => k.id === userData.kelas);
      if (kelas) setKelasName(kelas.name);
    } catch (err) {
      console.error(err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("blms_current_user");
    router.push("/login");
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Memuat...</div>;
  if (!user) return null;

  return (
    <main aria-labelledby="profile-heading" className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h1 id="profile-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">Profil Saya</h1>
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-red-700 font-semibold transition-colors active:bg-red-800"
            >
              Logout
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Nama Lengkap</label>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-900 break-words">{user.nama}</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Email</label>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-900 break-all">{user.email}</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Kelas</label>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-900">{kelasName || user.kelas}</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Asal Sekolah</label>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-900">{user.asal}</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Minat / Interest</label>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-900">{user.minat}</p>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Anggota Sejak</label>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString("id-ID")}</p>
            </div>
          </div>

            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/")}
              aria-label="Kembali ke Home"
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-900 text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-gray-300 font-semibold transition-colors active:bg-gray-400"
            >
              Kembali ke Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
