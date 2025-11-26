"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { kelasList } from "@/data/kelas-mapel";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, BookOpen, Building2, Sparkles } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    if (!nama.trim()) return "Nama lengkap wajib diisi.";
    if (!kelas) return "Pilih kelas.";
    if (!asal.trim()) return "Asal sekolah wajib diisi.";
    if (!minat.trim()) return "Minat wajib diisi.";
    if (!email.trim()) return "Email wajib diisi.";
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
    (async () => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nama, kelas, asal, minat, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || 'Pendaftaran gagal');
          setSubmitting(false);
          return;
        }

        setSuccess('Pendaftaran berhasil. Mengalihkan ke login...');
        setTimeout(() => router.push('/login'), 900);
      } catch (err) {
        console.error(err);
        setError('Terjadi kesalahan saat menghubungi server.');
      } finally {
        setSubmitting(false);
      }
    })();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-10 w-28 sm:w-40 h-28 sm:h-40 bg-indigo-200 rounded-full opacity-10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent break-words">Daftar Akun</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Isi data pendaftaran untuk membuat akun baru.</p>
        </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-4" aria-describedby={error ? 'form-error' : success ? 'form-success' : undefined}>
          {/* Nama Lengkap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="Nama lengkap"
                aria-invalid={!!error}
              />
            </div>
          </motion.div>

          {/* Pilih Kelas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <label htmlFor="kelas" className="block text-sm font-semibold text-gray-700 mb-2">Pilih Kelas</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="kelas"
                value={kelas === "" ? "" : String(kelas)}
                onChange={(e) => setKelas(e.target.value ? Number(e.target.value) : "")}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Pilih kelas...</option>
                {kelasList.map((k) => (
                  <option key={k.id} value={k.id}>{k.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Asal Sekolah */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <label htmlFor="asal" className="block text-sm font-semibold text-gray-700 mb-2">Asal Sekolah</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="asal"
                value={asal}
                onChange={(e) => setAsal(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="Nama sekolah"
                aria-invalid={!!error}
              />
            </div>
          </motion.div>

          {/* Minat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <label htmlFor="minat" className="block text-sm font-semibold text-gray-700 mb-2">Minat / Interest</label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="minat"
                value={minat}
                onChange={(e) => setMinat(e.target.value)}
                placeholder="Contoh: Pemrograman, Desain"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                aria-invalid={!!error}
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="email@example.com"
                aria-invalid={!!error}
              />
            </div>
          </motion.div>

          {/* Passwords Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Min. 6 karakter"
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Ulangi"
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-pressed={showConfirm}
                  aria-label={showConfirm ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              id="form-error"
              role="alert"
              aria-live="assertive"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              id="form-success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl text-sm font-medium"
            >
              {success}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="pt-4"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              disabled={submitting}
              aria-disabled={submitting}
              className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg active:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ○
                  </motion.div>
                  Mendaftarkan...
                </span>
              ) : (
                "Daftar Sekarang"
              )}
            </motion.button>
          </motion.div>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-xs sm:text-sm text-gray-600 text-center"
          >
            Sudah punya akun?{" "}
            <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Masuk di sini
            </a>
          </motion.div>
        </motion.form>
      </motion.div>
    </main>
  );
}
