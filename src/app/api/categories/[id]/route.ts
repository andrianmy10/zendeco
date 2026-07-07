import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

// UPDATE: Edit kategori
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // FIX: Unpack params pakai await
    const { id } = await params;
    
    const body = await request.json();
    const { name, deskripsi } = body;

    if (!name) {
      return NextResponse.json({ message: 'Nama kategori wajib diisi' }, { status: 400 });
    }

    await db.query(
      'UPDATE tb_categories SET name = ?, deskripsi = ? WHERE id = ?',
      [name, deskripsi || '', id]
    );

    return NextResponse.json({ message: 'Kategori berhasil diupdate' }, { status: 200 });
  } catch (error: any) {
    console.error('Error PUT Category:', error);
    return NextResponse.json({ message: 'Gagal mengupdate kategori' }, { status: 500 });
  }
}

// DELETE: Hapus kategori
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // FIX: Unpack params pakai await
    const { id } = await params;
    
    await db.query('DELETE FROM tb_categories WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Kategori berhasil dihapus' }, { status: 200 });
  } catch (error: any) {
    console.error('Error DELETE Category:', error);
    return NextResponse.json({ message: 'Gagal menghapus kategori' }, { status: 500 });
  }
}