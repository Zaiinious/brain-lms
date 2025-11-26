import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomBytes, scryptSync } from 'crypto';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

type RegisterBody = {
  nama: string;
  kelas: number | string;
  asal: string;
  minat: string;
  email: string;
  password: string;
};

function hashPassword(password: string, salt?: string) {
  const usedSalt = salt ?? randomBytes(16).toString('hex');
  const derived = scryptSync(password, usedSalt, 64);
  return { hash: derived.toString('hex'), salt: usedSalt };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterBody;
    if (!body.nama || !body.kelas || !body.asal || !body.minat || !body.email || !body.password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const usersRaw = await fs.readFile(USERS_FILE, 'utf-8');
    type StoredUser = Record<string, unknown> & { email: string };
    const users = (JSON.parse(usersRaw) as StoredUser[]);

    const exists = users.find((u) => u.email === body.email);
    if (exists) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const { hash, salt } = hashPassword(body.password);
    const newUser = {
      id: `user_${Date.now()}`,
      nama: body.nama,
      kelas: body.kelas,
      asal: body.asal,
      minat: body.minat,
      email: body.email,
      passwordHash: hash,
      salt,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

    const safeUser = { ...newUser } as Record<string, unknown>;
    delete safeUser.passwordHash;
    delete safeUser.salt;

    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
