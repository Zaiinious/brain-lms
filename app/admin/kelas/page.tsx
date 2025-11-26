"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Toast from '../../components/ui/Toast';

type K = { id: string; name: string; grade?: string };

export default function AdminKelas() {
  const [items, setItems] = useState<K[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', grade: '' });
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/kelas');
    const j = await r.json();
    setItems(j.items || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) { setError('Nama kelas diperlukan'); return; }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/kelas', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) });
        const j = await res.json().catch(() => ({}));
        if (res.ok) { setEditingId(null); setForm({ name: '', grade: '' }); await fetchAll(); setToast({ message: 'Kelas berhasil diperbarui', type: 'success' }); }
        else { setToast({ message: j?.error || 'Gagal memperbarui kelas', type: 'error' }); }
      } else {
        const res = await fetch('/api/admin/kelas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        const j = await res.json().catch(() => ({}));
        if (res.ok) { setForm({ name: '', grade: '' }); await fetchAll(); setToast({ message: 'Kelas berhasil ditambahkan', type: 'success' }); }
        else { setToast({ message: j?.error || 'Gagal menambahkan kelas', type: 'error' }); }
      }
    } catch (err) {
      setToast({ message: 'Terjadi kesalahan jaringan', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kelas ini?')) return;
    try {
      const res = await fetch('/api/admin/kelas', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { await fetchAll(); setToast({ message: 'Kelas dihapus', type: 'success' }); }
      else { setToast({ message: j?.error || 'Gagal menghapus kelas', type: 'error' }); }
    } catch (err) {
      setToast({ message: 'Terjadi kesalahan jaringan', type: 'error' });
    }
  };

  const startEdit = (item: K) => {
    setEditingId(item.id);
    setForm({ name: item.name || '', grade: item.grade || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ name: '', grade: '' }); setError(null); };

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link href="/admin" className="text-sm text-blue-600">← Dashboard</Link>
            <h2 className="text-xl font-bold mt-2">Kelola Kelas</h2>
          </div>
        </div>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Kelas" className="border p-2 rounded" />
          <input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} placeholder="Tingkat (contoh: X, XI)" className="border p-2 rounded" />
          <div className="sm:col-span-3">
            <div className="flex gap-2">
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">{editingId ? 'Simpan Perubahan' : 'Tambah Kelas'}</button>
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
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-slate-500">{s.grade}</div>
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
