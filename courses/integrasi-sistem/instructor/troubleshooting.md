# Troubleshooting

1. **JSON tidak termuat** — jalankan server lokal; jangan memakai `file://`.
2. **CORS** — periksa origin client dan konfigurasi middleware secara eksplisit.
3. **401** — token tidak ada atau tidak valid.
4. **403** — identitas valid tetapi permission tidak sesuai.
5. **404** — periksa URL, route, dan versi endpoint.
6. **Timeout** — periksa service tujuan, timeout limit, retry, dan correlation ID.
7. **Data tidak sinkron** — periksa mapping, ownership, idempotency, dan event duplikat.
