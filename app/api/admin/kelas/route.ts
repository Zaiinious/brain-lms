import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'kelas.json');

type Kelas = { id: string; name: string; level?: string; [k: string]: any };

async function readAll(): Promise<Kelas[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(raw) as Kelas[];
  } catch (e) {
    return [];
  }
}

async function writeAll(items: Kelas[]) {
  await fs.writeFile(FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export async function GET() {
  const items = await readAll();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const items = await readAll();
  const id = String(Date.now());
  const newItem: Kelas = { id, ...body };
  items.unshift(newItem);
  await writeAll(items);
  return NextResponse.json({ item: newItem }, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const items = await readAll();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  items[idx] = { ...items[idx], ...body };
  await writeAll(items);
  return NextResponse.json({ item: items[idx] });
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const id = body?.id as string | undefined;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const items = await readAll();
    const filtered = items.filter((i) => i.id !== id);
    await writeAll(filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
