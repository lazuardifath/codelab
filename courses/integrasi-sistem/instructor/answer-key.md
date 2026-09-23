# Answer Key Ringkas

Jawaban mahasiswa dapat berbeda jika asumsi dan alasannya konsisten. Acuan minimum:

- Integration Layer mengurangi koneksi langsung dan menjadi titik routing, tetapi perlu mitigasi single point of failure.
- `PaymentCompleted` adalah event yang menyatakan fakta telah terjadi; Notification Service dapat menjadi consumer.
- Validasi request gagal dengan `4xx`, sedangkan kegagalan internal service memakai `5xx`.
- Authentication menjawab siapa pemanggil; authorization menjawab apa yang boleh dilakukan.
- Test wajib mencakup alur berhasil, payload invalid, token salah/tidak ada, service timeout, dan response contract.
