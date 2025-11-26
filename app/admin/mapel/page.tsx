"use client";

import React, { useEffect, useState } from 'react';

type M = { id: string; name: string; slug?: string };

export default function AdminMapel() {
  const [items, setItems] = useState<M[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', slug: '' });
  const [error, setError] = useState<string | null>(null);

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
    const res = await fetch('/api/admin/mapel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setForm({ name: '', slug: '' }); await fetchAll(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus mapel ini?')) return;
    await fetch('/api/admin/mapel', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await fetchAll();
  };

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Kelola Mata Pelajaran</h2>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Mapel" className="border p-2 rounded" />
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="border p-2 rounded" />
          <div className="sm:col-span-3">
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Tambah Mapel</button>
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
