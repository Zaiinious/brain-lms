"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError('Email dan password diperlukan');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data?.error || 'Login gagal');
      const user = data.user;
      if (!user || (user as any).role !== 'admin') {
        return setError('Akun bukan admin');
      }
      localStorage.setItem('blms_admin', JSON.stringify(user));
      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? 'Memproses...' : 'Masuk sebagai Admin'}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
