# Kesalahan Umum

- Menganggap integrasi hanya memanggil endpoint tanpa contract dan ownership data.
- Menggunakan `200 OK` untuk semua kondisi, termasuk validation error.
- Menyamakan authentication dengan authorization.
- Menguji hanya happy path.
- Tidak mencatat versi schema atau perubahan API.
- Menaruh seluruh business logic di API Gateway.
- Tidak menyimpan evidence request, response, dan log.
