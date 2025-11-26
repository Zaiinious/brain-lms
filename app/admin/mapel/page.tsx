"use client";

import React, { useEffect, useState } from 'react';

type M = { id: string; name: string; slug?: string };

export default function AdminMapel() {
  const [items, setItems] = useState<M[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', slug: '' });
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/mapel');
    const j = await r.json();
    setItems(j.items || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) { setError('Nama mapel diperlukan'); return; }
    if (editingId) {
      const res = await fetch('/api/admin/mapel', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) });
      if (res.ok) { setEditingId(null); setForm({ name: '', slug: '' }); await fetchAll(); }
    } else {
      const res = await fetch('/api/admin/mapel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ name: '', slug: '' }); await fetchAll(); }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus mapel ini?')) return;
    await fetch('/api/admin/mapel', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await fetchAll();
  };

  const startEdit = (item: M) => {
    setEditingId(item.id);
    setForm({ name: item.name || '', slug: item.slug || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ name: '', slug: '' }); setError(null); };

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Kelola Mata Pelajaran</h2>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Mapel" className="border p-2 rounded" />
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="border p-2 rounded" />
          <div className="sm:col-span-3">
            <div className="flex gap-2">
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">{editingId ? 'Simpan Perubahan' : 'Tambah Mapel'}</button>
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
                  <div className="text-sm text-slate-500">{s.slug}</div>
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
