# UNIMUGO CodeLab

Platform Modul Praktikum Digital Program Studi S1 Teknologi Informasi, Universitas Muhammadiyah Gombong.

## Arsitektur

Platform menggunakan struktur **Platform → Mata Kuliah → Modul → Materi/Praktikum → Evaluasi**. Konten dipisahkan dari logika katalog melalui `data/courses.json`. Halaman utama membaca metadata tersebut sehingga mata kuliah baru dapat ditambahkan tanpa mengubah navigasi utama.

## Menjalankan lokal

Karena katalog membaca JSON melalui `fetch`, gunakan server HTTP lokal, bukan membuka `index.html` langsung melalui `file://`.

**Windows (cara paling sederhana):**

1. Buka Command Prompt atau PowerShell.
2. Pindah ke folder repository, yaitu folder yang berisi `index.html`.
3. Jalankan:

```text
python -m http.server 8000
```

4. Buka `http://localhost:8000` pada browser.
5. Hentikan server dengan `Ctrl+C`.

Jika perintah `python` tidak dikenali, coba `py -m http.server 8000`. Jangan membuka `index.html` dengan double-click karena browser akan menggunakan protokol `file://` dan memblokir `fetch()` ke file JSON.

## Status konten

Pemrograman Mobile memiliki tiga modul adaptasi awal. Mata kuliah lain tersedia sebagai metadata dan dapat dikembangkan melalui panduan pada `docs/authoring-guide.html`.
