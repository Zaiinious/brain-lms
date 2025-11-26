import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { scryptSync } from 'crypto';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email as string;
    const password = body.password as string;
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email/password' }, { status: 400 });
    }

    const usersRaw = await fs.readFile(USERS_FILE, 'utf-8');
    type StoredUser = Record<string, unknown> & { email: string; salt?: string; passwordHash?: string };
    const users = (JSON.parse(usersRaw) as StoredUser[]);
    const user = users.find((u) => u.email === email) as StoredUser | undefined;
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const derived = scryptSync(password, user.salt, 64).toString('hex');
    if (derived !== user.passwordHash) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // Exclude secret fields before returning by cloning and deleting them.
    const safeUserPublic = { ...(user as StoredUser) } as Record<string, unknown>;
    delete safeUserPublic.passwordHash;
    delete safeUserPublic.salt;

    return NextResponse.json({ user: safeUserPublic }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
