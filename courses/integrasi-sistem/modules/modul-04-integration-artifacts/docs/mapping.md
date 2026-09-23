# Student Mapping

| System A — Academic Service | System B — Academic Consumer | Transformation |
|---|---|---|
| `student_id` | `nim` | direct/rename |
| `name` | `nama` | direct/rename |
| `study_program` | `prodi` | lookup: Teknologi Informasi → TI |
| `email` | `email_address` | rename |

## Hasil transformasi

```json
{
  "nim": "20240001",
  "nama": "Ahmad Fauzan",
  "prodi": "TI",
  "email_address": "ahmad@example.com"
}
```
