# Integrasi Sistem — UNIMUGO CodeLab

Codelab ini adalah learning journey dari fundamental integrasi hingga membangun dan menguji **Integrated Campus System**. Semua modul menggunakan studi kasus yang sama sehingga artefak modul sebelumnya menjadi input modul berikutnya.

## Identitas

- Program Studi: S1 Teknologi Informasi
- Dosen Pengampu: Lazuardi Fatahilah Hamdi, S.Kom., M.Eng.
- CPL: CPL06
- CPMK: CPMK062
- Stack core: PHP 8.3, Laravel 12, MySQL/MariaDB, REST API + JSON, Postman, Git/GitHub, Laravel Sanctum, Queue, Events, Logging, dan PHPUnit/Pest
- Stack pengayaan: OpenAPI/Swagger, Redis, RabbitMQ, Docker, API Gateway, OAuth 2.0, Kong, Traefik, dan Telescope

## Alur modul

1. Fundamental Integrasi Sistem
2. System Interoperability
3. Integration Architecture
4. Integration Artifacts
5. Data Integration dan Transformation
6. HTTP, REST, dan Web Service
7. REST API Design
8. API Security
9. Synchronous dan Asynchronous Integration
10. Message dan Event-Driven Integration
11. Middleware dan API Gateway
12. Workflow dan Service Orchestration
13. Implementasi Integrasi
14. Error Handling, Logging, dan Monitoring
15. Integration Testing
16. Final Integration Project

UTS dilaksanakan setelah modul 8 sebagai case-based assessment. UAS dilaksanakan bersama pertanggungjawaban final project setelah modul 16.

## Final project

Mahasiswa mengintegrasikan Student Service, Payment Service, dan Notification Service melalui Integration Layer/API Gateway. Luaran akhir: dokumentasi arsitektur, source code, API documentation, database schema, data mapping, workflow, security, test report, README, demo video, dan presentasi.

## Milestone

`M1 Problem Definition` → `M2 Requirement Analysis` → `M3 Architecture` → `M4 Data Model & Mapping` → `M5 API Design` → `M6 Security` → `M7 Integration Implementation` → `M8 Error Handling` → `M9 Testing` → `M10 Final Integration System`.

## Cara menjalankan

Jalankan dari root repository dengan `py -m http.server 8000`, lalu buka `http://localhost:8000`. Jangan membuka halaman melalui `file://` karena modul memuat JSON menggunakan `fetch`.
