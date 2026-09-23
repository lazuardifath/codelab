# Teaching Guide — Integrasi Sistem

## Prinsip pengajaran

Gunakan urutan **Learn → Understand → Analyze → Design → Build → Test → Evaluate**. Jangan memulai dari copy-paste coding. Minta mahasiswa menjelaskan alasan desain sebelum menjalankan implementasi.

## Fokus per tahap

- Modul 1–5: masalah, interoperabilitas, arsitektur, artefak, dan data.
- Modul 6–8: komunikasi HTTP, desain REST API, dan keamanan.
- Modul 9–12: pola komunikasi, event, middleware, gateway, dan orchestration.
- Modul 13–16: implementasi, reliability, testing, dan pertanggungjawaban project.

## Pertanyaan pemantik

1. Sistem mana yang menjadi sumber kebenaran untuk data mahasiswa?
2. Apa yang terjadi jika Payment Service tidak merespons?
3. Mengapa data yang formatnya sama belum tentu memiliki makna yang sama?
4. Artefak apa yang dibutuhkan developer client sebelum memanggil API?
5. Bukti apa yang menunjukkan integrasi benar-benar bekerja?

## Indikator keberhasilan

Mahasiswa mampu menelusuri hubungan requirement → architecture → contract/schema → implementation → test evidence. Setiap revisi harus meninggalkan artefak dan catatan perubahan di Git.

## Catatan fasilitasi

Berikan review singkat pada setiap milestone. Jika kemampuan coding beragam, nilai pemahaman kontrak, alasan desain, dan bukti pengujian secara terpisah dari kompleksitas framework.
