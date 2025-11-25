"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { kelasList } from "@/data/kelas-mapel";

type LocalUser = {
  id: string;
  nama: string;
  kelas: number | string;
  asal: string;
  minat: string;
  email: string;
  password: string;
  createdAt: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState<number | "">("");
  const [asal, setAsal] = useState("");
  const [minat, setMinat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!nama.trim()) return "Nama lengkap wajib diisi.";
    if (!kelas) return "Pilih kelas.";
    if (!asal.trim()) return "Asal sekolah wajib diisi.";
    if (!minat.trim()) return "Minat wajib diisi.";
    if (!email.trim()) return "Email wajib diisi.";
    // basic email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Format email tidak valid.";
    if (password.length < 6) return "Password minimal 6 karakter.";
    if (password !== confirmPassword) return "Password dan konfirmasi tidak cocok.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);

    // simple demo persistence in localStorage
    try {
      const usersRaw = localStorage.getItem("blms_users") || "[]";
      const users = (JSON.parse(usersRaw) as LocalUser[]);
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setError("Email sudah terdaftar. Silakan login atau gunakan email lain.");
        setSubmitting(false);
        return;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        nama,
        kelas,
        asal,
        minat,
        email,
        // NOTE: storing plaintext password here is only for demo/local dev purposes
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser as LocalUser);
      localStorage.setItem("blms_users", JSON.stringify(users));

      setSuccess("Pendaftaran berhasil. Anda akan diarahkan ke halaman login...");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2">Daftar Akun</h1>
        <p className="text-sm text-gray-500 mb-6">Isi data pendaftaran untuk membuat akun baru.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input value={nama} onChange={(e) => setNama(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pilih Kelas</label>
            <select value={kelas === "" ? "" : String(kelas)} onChange={(e) => setKelas(e.target.value ? Number(e.target.value) : "")} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option value="">Pilih kelas...</option>
              {kelasList.map((k) => (
                <option key={k.id} value={k.id}>{k.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Asal Sekolah</label>
            <input value={asal} onChange={(e) => setAsal(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Minat / Interest</label>
            <input value={minat} onChange={(e) => setMinat(e.target.value)} placeholder="Contoh: Pemrograman, Desain" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-600">{success}</div>}

          <div className="pt-2">
            <button disabled={submitting} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
              {submitting ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>
          </div>

          <div className="text-sm text-gray-500 text-center">
            Sudah punya akun? <a href="/login" className="text-blue-600">Masuk</a>
          </div>
        </form>
      </div>
    </main>
  );
}
