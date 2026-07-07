import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import db from '@/src/lib/db';

// Update tipe params jadi Promise
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // FIX: Unpack params pakai await
    const { id } = await params; 
    
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stok = parseInt(formData.get('stok') as string);
    const categoryId = parseInt(formData.get('categoryId') as string);
    const file = formData.get('image') as File | null;

    if (!name || isNaN(price) || isNaN(stok) || isNaN(categoryId)) {
      return NextResponse.json({ message: 'Data update tidak valid' }, { status: 400 });
    }

    const [rows]: any = await db.query('SELECT images FROM tb_products WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Produk tidak ditemukan' }, { status: 404 });
    }

    let finalImagesJson = rows[0].images;

    if (file) {
      if (rows[0].images) {
        try {
          const oldPaths = JSON.parse(rows[0].images);
          if (oldPaths.length > 0) {
            const oldFilePath = path.join(process.cwd(), 'public', oldPaths[0]);
            await fs.unlink(oldFilePath);
          }
        } catch (_) { }
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `prod-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
      const uploadDir = path.join(process.cwd(), 'public', 'assets', 'produk');
      const fullPath = path.join(uploadDir, filename);

      await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(fullPath);

      finalImagesJson = JSON.stringify([`/assets/produk/${filename}`]);
    }

    await db.query(
      'UPDATE tb_products SET name = ?, description = ?, price = ?, images = ?, stok = ?, categoryId = ? WHERE id = ?',
      [name, description || '', price, finalImagesJson, stok, categoryId, id]
    );

    return NextResponse.json({ message: 'Informasi produk berhasil diperbarui' }, { status: 200 });

  } catch (error: any) {
    console.error('Error PUT Product:', error);
    return NextResponse.json({ message: 'Gagal memperbarui data produk' }, { status: 500 });
  }
}

// Lakukan hal yang sama buat fungsi DELETE
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // FIX: Unpack params pakai await
    const { id } = await params;

    const [rows]: any = await db.query('SELECT images FROM tb_products WHERE id = ? LIMIT 1', [id]);
    
    if (rows.length > 0 && rows[0].images) {
      try {
        const oldPaths = JSON.parse(rows[0].images);
        if (oldPaths.length > 0) {
          const oldFilePath = path.join(process.cwd(), 'public', oldPaths[0]);
          await fs.unlink(oldFilePath);
        }
      } catch (_) {}
    }

    await db.query('DELETE FROM tb_products WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Produk berhasil dihapus' }, { status: 200 });
  } catch (error: any) {
    console.error('Error DELETE Product:', error);
    return NextResponse.json({ message: 'Gagal menghapus produk' }, { status: 500 });
  }
}