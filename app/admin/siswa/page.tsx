"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Toast from '../../components/ui/Toast';

type S = { id: string; nama: string; kelas?: string; asal?: string; minat?: string; email?: string; passwordHash?: string; salt?: string };

export default function AdminSiswa() {
  const [items, setItems] = useState<S[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nama: '', kelas: '', asal: '', minat: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [kelasOptions, setKelasOptions] = useState<Array<{ id: string; name: string }>>([]);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/siswa');
    const j = await r.json();
    setItems(j.items || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/admin/kelas');
        const j = await r.json();
        const opts = (j.items || []).map((it: any) => ({ id: it.id, name: it.name }));
        setKelasOptions(opts);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.nama.trim()) {
      setError('Nama diperlukan');
      return;
    }
    if (form.password || form.confirmPassword) {
      if (form.password !== form.confirmPassword) { setError('Password dan konfirmasi tidak cocok'); return; }
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/siswa', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) });
        const j = await res.json().catch(() => ({}));
        if (res.ok) { setEditingId(null); setForm({ nama: '', kelas: '', asal: '', minat: '', email: '', password: '', confirmPassword: '' }); await fetchAll(); setToast({ message: 'Siswa berhasil diperbarui', type: 'success' }); }
        else { setToast({ message: j?.error || 'Gagal memperbarui siswa', type: 'error' }); }
      } else {
        const res = await fetch('/api/admin/siswa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        const j = await res.json().catch(() => ({}));
        if (res.ok) { setForm({ nama: '', kelas: '', asal: '', minat: '', email: '', password: '', confirmPassword: '' }); await fetchAll(); setToast({ message: 'Siswa berhasil ditambahkan', type: 'success' }); }
        else { setToast({ message: j?.error || 'Gagal menambahkan siswa', type: 'error' }); }
      }
    } catch (err) {
      setToast({ message: 'Terjadi kesalahan jaringan', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus siswa ini?')) return;
    try {
      const res = await fetch('/api/admin/siswa', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { await fetchAll(); setToast({ message: 'Siswa dihapus', type: 'success' }); }
      else { setToast({ message: j?.error || 'Gagal menghapus siswa', type: 'error' }); }
    } catch (err) {
      setToast({ message: 'Terjadi kesalahan jaringan', type: 'error' });
    }
  };

  const startEdit = (item: S) => {
    setEditingId(item.id);
    setForm({ nama: item.nama || '', kelas: item.kelas || '', asal: item.asal || '', minat: item.minat || '', email: item.email || '', password: '', confirmPassword: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ nama: '', kelas: '', asal: '', minat: '', email: '', password: '', confirmPassword: '' }); setError(null); };

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link href="/admin" className="text-sm text-blue-600">← Dashboard</Link>
            <h2 className="text-xl font-bold mt-2">Kelola Siswa</h2>
          </div>
        </div>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama" className="border p-2 rounded" />
          <input value={form.kelas} onChange={(e) => setForm({ ...form, kelas: e.target.value })} placeholder="Kelas" className="border p-2 rounded" />
          <input value={form.asal} onChange={(e) => setForm({ ...form, asal: e.target.value })} placeholder="Asal Sekolah" className="border p-2 rounded" />
          <div className="sm:col-span-3">
            <div className="flex gap-2">
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">{editingId ? 'Simpan Perubahan' : 'Tambah Siswa'}</button>
              {editingId && <button type="button" onClick={cancelEdit} className="mt-2 px-4 py-2 bg-gray-300 text-slate-800 rounded">Batal</button>}
            </div>
          </div>
        </form>

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

        {loading ? <div>Memuat...</div> : (
          <div className="space-y-2">
            {items.map((s) => (
              <div key={s.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
                <div>
                  <div className="font-medium">{s.nama}</div>
                  <div className="text-sm text-slate-500">{s.kelas} — {s.asal}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(s)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-600 text-white rounded">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
