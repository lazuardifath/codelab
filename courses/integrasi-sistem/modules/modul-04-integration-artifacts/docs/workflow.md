# Academic Integration Workflow

1. Academic Consumer membutuhkan data mahasiswa.
2. Consumer mengirim `GET /api/v1/students/{student_id}` melalui HTTP/HTTPS.
3. Academic Service menerima dan memvalidasi parameter.
4. Academic Service melakukan query ke database.
5. Provider membuat response JSON sesuai API contract dan schema.
6. Response dikirim kembali ke consumer.
7. Consumer memetakan `student_id`, `name`, `study_program`, dan `email` ke format internal.
8. Consumer menampilkan atau meneruskan hasil mapping.

Artefak yang terlibat: protocol, endpoint, contract, schema, response message, mapping, dan workflow.
