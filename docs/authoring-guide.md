# Panduan Menambahkan Materi

## Menambahkan mata kuliah

1. Buat folder `courses/nama-mata-kuliah/`.
2. Tambahkan `index.html` dengan template course yang memakai `assets/css` dan `assets/js/app.js`.
3. Tambahkan metadata pada `data/courses.json`.
4. Buat `syllabus.md` dan folder modul.
5. Pastikan setiap modul memiliki `index.html` dan `README.md`.
6. Uji pada server lokal, lalu commit dan push.

Metadata minimal: `id`, `name`, `shortName`, `description`, `category`, `semester`, `status`, `type`, `version`, `lastUpdated`, dan `moduleCount`.

## Menambahkan modul

Gunakan pola `courses/nama-mata-kuliah/modul-04/`. Isi modul sekurang-kurangnya mencakup identitas, capaian pembelajaran, pengantar, tools/prasyarat bila relevan, konsep dasar, studi kasus, langkah, output, eksperimen, tugas, refleksi, dan referensi. Untuk modul reading atau metodologi, bagian source code dan terminal boleh dihilangkan.

## Penamaan dan konteks

Gunakan slug huruf kecil dengan tanda hubung. Pakai studi kasus yang realistis untuk mahasiswa UNIMUGO, tetapi hindari penyebutan institusi berulang. Cantumkan atribusi dan lisensi sumber eksternal jika diwajibkan.
