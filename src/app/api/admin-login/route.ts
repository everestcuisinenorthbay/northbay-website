import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface UserCredential {
  id: string;
  username: string;
  passwordHash: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const userCredentialsString = process.env.USER_CREDENTIALS_JSON;

    if (!userCredentialsString) {
      console.error('USER_CREDENTIALS_JSON is not defined in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    let users: UserCredential[] = [];
    try {
      users = JSON.parse(userCredentialsString);
    } catch (e) {
      console.error('Error parsing USER_CREDENTIALS_JSON:', e);
      return NextResponse.json({ error: 'Server configuration error (invalid JSON)' }, { status: 500 });
    }

    const user = users.find(u => u.username === username);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Do not send password hash or sensitive info back
    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
} 