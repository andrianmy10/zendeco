import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import db from '@/src/lib/db';

// GET: Ambil semua produk + join nama kategori
export async function GET() {
  try {
    const queryStr = `
      SELECT p.*, c.name as categoryName 
      FROM tb_products p 
      LEFT JOIN tb_categories c ON p.categoryId = c.id 
      ORDER BY p.created_at DESC
    `;
    const [rows] = await db.query(queryStr);
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error GET Products:', error);
    return NextResponse.json({ message: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

// POST: Tambah produk baru beserta konversi WebP gambar
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stok = parseInt(formData.get('stok') as string);
    const categoryId = parseInt(formData.get('categoryId') as string);
    const file = formData.get('image') as File | null;

    if (!name || isNaN(price) || isNaN(stok) || isNaN(categoryId)) {
      return NextResponse.json({ message: 'Informasi data produk tidak lengkap' }, { status: 400 });
    }

    let savedImagesJson = "[]";

    // Jika ada file gambar yang di-upload
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Bikin nama file unik berformat .webp
      const filename = `prod-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
      
      // Path penyimpanan target: public/assets/produk/
      const uploadDir = path.join(process.cwd(), 'public', 'assets', 'produk');
      
      // Pastikan direktorinya tercipta otomatis di server biar ga error
      await fs.mkdir(uploadDir, { recursive: true });
      const fullPath = path.join(uploadDir, filename);

      // Gunakan sharp: Konversi ke WebP, batasi lebar max 800px (biar resolusi seimbang/ringan)
      await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 }) // Kompresi kualitas 80% (tetep bening, size anjlok drastis)
        .toFile(fullPath);

      savedImagesJson = JSON.stringify([`/assets/produk/${filename}`]);
    }

    // Insert ke DB
    await db.query(
      'INSERT INTO tb_products (name, description, price, images, stok, categoryId) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description || '', price, savedImagesJson, stok, categoryId]
    );

    return NextResponse.json({ message: 'Produk berhasil ditambahkan' }, { status: 201 });

  } catch (error: any) {
    console.error('Error POST Product:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal server' }, { status: 500 });
  }
}