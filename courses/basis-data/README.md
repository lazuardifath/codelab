# Course Basis Data

Course ini adalah learning path interaktif untuk mahasiswa semester awal S1 Teknologi Informasi Universitas Muhammadiyah Gombong.

## Alur belajar

```text
Pengantar basis data → ERD → EERD → Pemodelan logis → Normalisasi → Relational database → SQL
```

Studi kasus yang dipakai konsisten adalah **Sistem Akademik Universitas** dengan data Mahasiswa, Dosen, Program Studi, Mata Kuliah, KRS, dan Nilai.

## Modul tersedia

1. `modules/modul-01-pengantar-basis-data/` — data, informasi, database, DBMS, dan komponen sistem.
2. `modules/modul-02-pemodelan-data-dasar-erd/` — entity, attribute, relationship, cardinality, ERD, latihan interaktif, dan referensi presentasi dosen.
3. `modules/modul-03-pemodelan-konseptual-lanjut-eerd/` — supertype/subtype, generalization, specialization, disjointness, completeness, recursive, dan ternary relationship.

Modul lanjutan dapat ditambahkan sebagai sibling directory tanpa mengubah komponen modul yang sudah ada, misalnya `modul-04-pemodelan-logis/` dan `modul-05-normalisasi/`.

## Referensi dosen

File PPTX dan PDF berada di `powerpoint/` dan `pdf/`. PPTX diperlakukan sebagai bahan pendalaman, bukan pengganti materi course. Karena browser tidak menjamin rendering PPTX secara native, setiap referensi menyediakan fallback PDF.

## Progress dan latihan

Progress checklist dan hasil quiz disimpan lokal di browser menggunakan `localStorage`. Data ini tidak dikirim ke server GitHub Pages dan dapat hilang jika storage browser dibersihkan.

## Menambah modul

Gunakan pola berikut:

```text
modules/modul-04-nama-modul/index.html
```

Tambahkan metadata modul ke `data/courses.json`, gunakan stylesheet dan script yang sama, lalu tambahkan link pada navigation course.
