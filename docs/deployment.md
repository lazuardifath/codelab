# Deployment dan Pengembangan Lokal

## Menjalankan lokal

Jangan membuka `index.html` dengan double-click. Katalog mengambil metadata melalui `fetch()`, sehingga membutuhkan HTTP server.

Pada Windows, double-click `start-local.bat`, atau jalankan dari folder repository:

```text
py -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## GitHub Pages

Repository ini merupakan static website dan tidak membutuhkan PHP, database server, atau runtime Node.js di production.

1. Buka **Settings → Pages** pada repository.
2. Pilih **GitHub Actions** sebagai source.
3. Push perubahan ke branch utama.
4. Workflow akan mengunggah seluruh isi repository sebagai artifact Pages.

Setelah deployment pertama, URL project mengikuti konfigurasi GitHub Pages repository. Gunakan tautan relatif agar materi tetap bekerja pada project site.
