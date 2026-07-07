import { NextResponse } from 'next/server';
import db from '@/src/lib/db'; // Sesuaikan path db.ts lu

// READ: Ambil semua data kategori
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM tb_categories ORDER BY created_at DESC');
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error GET Categories:', error);
    return NextResponse.json({ message: 'Gagal mengambil data kategori' }, { status: 500 });
  }
}

// CREATE: Tambah kategori baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, deskripsi } = body;

    if (!name) {
      return NextResponse.json({ message: 'Nama kategori wajib diisi' }, { status: 400 });
    }

    const [result]: any = await db.query(
      'INSERT INTO tb_categories (name, deskripsi) VALUES (?, ?)',
      [name, deskripsi || '']
    );

    return NextResponse.json({ 
      message: 'Kategori berhasil ditambahkan', 
      id: result.insertId 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error POST Category:', error);
    return NextResponse.json({ message: 'Gagal menambahkan kategori' }, { status: 500 });
  }
}