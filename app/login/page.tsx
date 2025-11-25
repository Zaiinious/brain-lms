"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setSubmitting(true);
    try {
      const usersRaw = localStorage.getItem("blms_users") || "[]";
      type LocalUser = { email: string; password: string };
      const users = (JSON.parse(usersRaw) as LocalUser[]);
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError("Email atau password salah.");
        setSubmitting(false);
        return;
      }

      // demo: store current user in localStorage
      localStorage.setItem("blms_current_user", JSON.stringify(user));
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat login.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2">Masuk</h1>
        <p className="text-sm text-gray-500 mb-6">Gunakan email dan password untuk masuk ke akun Anda.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <button disabled={submitting} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
              {submitting ? "Memproses..." : "Masuk"}
            </button>
          </div>

          <div className="text-sm text-gray-500 text-center">
            Belum punya akun? <a href="/signup" className="text-blue-600">Daftar</a>
          </div>
        </form>
      </div>
    </main>
  );
}
