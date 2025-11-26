import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomBytes, scryptSync } from 'crypto';

const FILE = path.join(process.cwd(), 'data', 'siswa.json');

type Siswa = { id: string; nama: string; kelas?: string; asal?: string; [k: string]: any };

async function readAll(): Promise<Siswa[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(raw) as Siswa[];
  } catch (e) {
    return [];
  }
}

async function writeAll(items: Siswa[]) {
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

  // If password provided, derive hash+salt and store them instead of plain password
  if (body?.password && typeof body.password === 'string' && body.password.length > 0) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(body.password, salt, 64).toString('hex');
    body.passwordHash = hash;
    body.salt = salt;
  }
  // remove plain password/confirmPassword if present
  if (body.password) delete body.password;
  if (body.confirmPassword) delete body.confirmPassword;

  const newItem: Siswa = { id, ...body };
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
  // If password provided on update, derive new hash+salt
  if (body?.password && typeof body.password === 'string' && body.password.length > 0) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(body.password, salt, 64).toString('hex');
    body.passwordHash = hash;
    body.salt = salt;
  }
  if (body.password) delete body.password;
  if (body.confirmPassword) delete body.confirmPassword;

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
