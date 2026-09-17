# Portofolio PPG PJOK - Aladona Khairulloh Ibrahim

Portofolio reflektif bilingual untuk perjalanan PPG Prajabatan PJOK Aladona Khairulloh Ibrahim. Halaman merangkum identitas belajar, refleksi 4C, pengalaman PPL di SDN 1 Setonopande, arah inovasi, dan roadmap profesional.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Pemeriksaan produksi:

```bash
npm run lint
npm run typecheck
npm run build
```

## Struktur konten

- `data/portfolio.ts` berisi semua teks bilingual dan 12 mata kuliah.
- `lib/portfolio-types.ts` berisi kontrak data untuk konten dan refleksi.
- `components/` berisi section, navigasi, provider, modal, dan primitive motion.
- `public/assets/image/` menyimpan placeholder visual yang mudah diganti dengan foto asli Aladona.
- `public/assets/document/` disiapkan untuk PDF artefak yang akan ditambahkan kemudian.

## Mengganti materi

Tambahkan gambar dan PDF asli ke folder aset, lalu isi properti `image` atau `pdf` pada course terkait di `data/portfolio.ts`. Draf narasi dibuat netral agar dapat diganti tanpa mengubah struktur komponen.

## Deployment

Proyek memakai Next.js static export. `NEXT_PUBLIC_BASE_PATH` dapat digunakan untuk mengganti subpath hosting; tanpa variabel itu, production memakai `/portofolio-ppg-aladona` untuk GitHub Pages.
