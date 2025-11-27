/* eslint-disable */
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Toast from '../../components/ui/Toast';

type G = { id: string; nama: string; mapel?: string; bio?: string };

export default function AdminGuru() {
  const [items, setItems] = useState<G[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nama: '', mapel: '', bio: '' });
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/guru');
    const j = await r.json();
    setItems(j.items || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.nama.trim()) {
      setError('Nama diperlukan');
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/guru', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) });
        const j = await res.json().catch(() => ({}));
        if (res.ok) { setEditingId(null); setForm({ nama: '', mapel: '', bio: '' }); await fetchAll(); setToast({ message: 'Guru berhasil diperbarui', type: 'success' }); }
        else { setToast({ message: j?.error || 'Gagal memperbarui guru', type: 'error' }); }
      } else {
        const res = await fetch('/api/admin/guru', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        const j = await res.json().catch(() => ({}));
        if (res.ok) { setForm({ nama: '', mapel: '', bio: '' }); await fetchAll(); setToast({ message: 'Guru berhasil ditambahkan', type: 'success' }); }
        else { setToast({ message: j?.error || 'Gagal menambahkan guru', type: 'error' }); }
      }
    } catch (err) {
      setToast({ message: 'Terjadi kesalahan jaringan', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus guru ini?')) return;
    try {
      const res = await fetch('/api/admin/guru', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { await fetchAll(); setToast({ message: 'Guru dihapus', type: 'success' }); }
      else { setToast({ message: j?.error || 'Gagal menghapus guru', type: 'error' }); }
    } catch (err) {
      setToast({ message: 'Terjadi kesalahan jaringan', type: 'error' });
    }
  };

  const startEdit = (item: G) => {
    setEditingId(item.id);
    setForm({ nama: item.nama || '', mapel: item.mapel || '', bio: item.bio || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ nama: '', mapel: '', bio: '' }); setError(null); };

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link href="/admin" className="text-sm text-blue-600">← Dashboard</Link>
            <h2 className="text-xl font-bold mt-2">Kelola Guru</h2>
          </div>
        </div>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama" className="border p-2 rounded" />
          <input value={form.mapel} onChange={(e) => setForm({ ...form, mapel: e.target.value })} placeholder="Mata Pelajaran" className="border p-2 rounded" />
          <input value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio singkat" className="border p-2 rounded" />
          <div className="sm:col-span-3">
            <div className="flex gap-2">
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">{editingId ? 'Simpan Perubahan' : 'Tambah Guru'}</button>
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
                  <div className="text-sm text-slate-500">{s.mapel}</div>
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
