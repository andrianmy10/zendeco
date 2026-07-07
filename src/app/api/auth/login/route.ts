import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/src/lib/db'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Validasi Input Kosong
    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan Password wajib diisi' }, { status: 400 });
    }

    // 2. Query ke database mencari user berdasarkan username
    // Pake array destructuring buat ngambil rows dari hasil query mysql2
    const [rows] = await db.query(
      'SELECT id, username, password, fullname, role, ts FROM tb_users WHERE username = ? LIMIT 1',
      [username]
    );
    
    // Cast rows ke array dan ambil data pertama (kalau ada)
    const users = rows as any[];
    const user = users[0];

    // 3. Cek apakah user ada di database
    if (!user) {
      return NextResponse.json({ message: 'Username tidak ditemukan' }, { status: 404 });
    }

    // 4. Verifikasi Password pake bcrypt
    // Membandingkan password dari input form dengan hashed password dari database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 });
    }

    // 5. Sukses! Hapus password dari object sebelum dikirim ke frontend
    const { password: _, ...userData } = user; 

    return NextResponse.json({ 
      message: 'Login berhasil',
      user: userData 
    }, { status: 200 });

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}