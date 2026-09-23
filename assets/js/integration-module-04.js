(() => {
  const root = document.body;
  const base = root.dataset.base || '../../../../';
  const esc = (value) => String(value ?? '').replace(/[&<>\"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const codeBlock = (filename, value) => `<div class="code-wrap"><div class="code-filename">${esc(filename)}</div><button class="copy-code" type="button">Salin</button><pre><code>${esc(value)}</code></pre></div>`;
  const flow = (items) => `<div class="artifact-flow">${items.map((item, index) => `<div class="artifact-flow-step"><div class="artifact-flow-node"><span>${esc(item[0])}</span><small>${esc(item[1])}</small></div>${index < items.length - 1 ? '<div class="artifact-flow-arrow" aria-hidden="true"></div>' : ''}</div>`).join('')}</div>`;
  const architecture = `<div class="artifact-architecture"><div class="artifact-system"><span>System B</span><strong>Academic Consumer</strong><small>Meminta dan memetakan data</small></div><div class="artifact-wire"><span>HTTPS · JSON</span></div><div class="artifact-system artifact-provider"><span>System A</span><strong>Academic Service</strong><small>Menyediakan data mahasiswa</small></div><div class="artifact-db">Database Student</div></div>`;
  const responseJson = '{\n  "data": {\n    "student_id": "20240001",\n    "name": "Ahmad Fauzan",\n    "study_program": "Teknologi Informasi",\n    "email": "ahmad@example.com"\n  }\n}';
  const requestJson = '{\n  "student_id": "20240002",\n  "name": "Siti Aisyah",\n  "study_program": "Teknologi Informasi",\n  "email": "siti@example.com"\n}';
  const schemaJson = '{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "properties": {\n    "data": {\n      "type": "object",\n      "properties": {\n        "student_id": { "type": "string" },\n        "name": { "type": "string" },\n        "study_program": { "type": "string" },\n        "email": { "type": "string", "format": "email" }\n      },\n      "required": ["student_id", "name", "study_program"]\n    }\n  },\n  "required": ["data"]\n}';
  const controllerCode = `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Student;
use Illuminate\\Http\\Request;
use Illuminate\\Validation\\Rule;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Student::orderBy('student_id')->get()]);
    }

    public function show(string $student_id)
    {
        $student = Student::where('student_id', $student_id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json(['data' => $student]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => ['required', 'string', 'unique:students,student_id'],
            'name' => ['required', 'string'],
            'study_program' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:students,email'],
        ]);

        return response()->json([
            'message' => 'Student created successfully',
            'data' => Student::create($data),
        ], 201);
    }

    public function update(Request $request, string $student_id)
    {
        $student = Student::where('student_id', $student_id)->first();
        if (!$student) return response()->json(['message' => 'Student not found'], 404);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string'],
            'study_program' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', Rule::unique('students', 'email')->ignore($student->id)],
        ]);
        $student->update($data);
        return response()->json(['message' => 'Student updated successfully', 'data' => $student]);
    }

    public function destroy(string $student_id)
    {
        $student = Student::where('student_id', $student_id)->first();
        if (!$student) return response()->json(['message' => 'Student not found'], 404);
        $student->delete();
        return response()->noContent();
    }
}`;
  const routeCode = `use App\\Http\\Controllers\\Api\\V1\\StudentController;

Route::prefix('v1')->group(function () {
    Route::get('/students', [StudentController::class, 'index']);
    Route::get('/students/{student_id}', [StudentController::class, 'show']);
    Route::post('/students', [StudentController::class, 'store']);
    Route::put('/students/{student_id}', [StudentController::class, 'update']);
    Route::delete('/students/{student_id}', [StudentController::class, 'destroy']);
});`;
  const modelCode = `class Student extends Model
{
    protected $fillable = [
        'student_id', 'name', 'study_program', 'email',
    ];
}`;
  const migrationCode = `Schema::create('students', function (Blueprint $table) {
    $table->id();
    $table->string('student_id')->unique();
    $table->string('name');
    $table->string('study_program');
    $table->string('email')->unique();
    $table->timestamps();
});`;
  const mappingCode = '{\n  "nim": "20240001",\n  "nama": "Ahmad Fauzan",\n  "prodi": "TI",\n  "email_address": "ahmad@example.com"\n}';
  const openApiCode = `openapi: 3.0.3
info:
  title: Academic Service API
  version: 1.0.0
paths:
  /api/v1/students/{student_id}:
    get:
      parameters:
        - name: student_id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Student ditemukan
        '404':
          description: Student tidak ditemukan`;
  const content = () => `
<section id="tujuan"><h2>4.1 Tujuan Pembelajaran</h2><p>Setelah menyelesaikan modul ini, mahasiswa mampu mengidentifikasi endpoint, API contract, schema, message, mapping, workflow, dan protocol dalam sebuah integrasi sistem.</p><div class="learning-grid"><div class="learning-card"><strong>Prasyarat</strong><p>Selesaikan Modul 3 tentang arsitektur integrasi. Bawa architecture decision yang telah dibuat.</p></div><div class="learning-card"><strong>Luaran utama</strong><p>Academic Service API, contract, JSON Schema, message examples, mapping document, workflow, protocol analysis, dan evidence pengujian.</p></div></div></section>
<section id="kasus"><h2>4.2 Gambaran Kasus</h2><p>Kita memiliki dua sistem. <strong>Academic Service</strong> menyimpan data mahasiswa dan menyediakan REST API. <strong>Academic Consumer</strong> meminta data tersebut, lalu mengubah nama field agar sesuai kebutuhan internalnya.</p>${architecture}<div class="callout"><strong>Aturan kasus:</strong> System B tidak boleh membaca database System A secara langsung. Komunikasi harus melalui endpoint dan contract yang disepakati.</div></section>
<section id="peta"><h2>4.3 Peta Artefak Integrasi</h2><p>Ketujuh artefak berikut menjawab pertanyaan yang berbeda tetapi saling terhubung.</p>${flow([['Protocol','bagaimana komunikasi berlangsung'],['Endpoint','ke mana request dikirim'],['API Contract','aturan provider dan consumer'],['Schema','bentuk data yang diperbolehkan'],['Message','data aktual yang dikirim'],['Mapping','penerjemahan field antar sistem'],['Workflow','urutan proses keseluruhan']])}<table class="rubric-table"><thead><tr><th>Artefak</th><th>Pertanyaan yang dijawab</th><th>Contoh</th></tr></thead><tbody><tr><td>Endpoint</td><td>Ke alamat mana service dipanggil?</td><td><code>/api/v1/students/{student_id}</code></td></tr><tr><td>Contract</td><td>Apa kesepakatan request-response?</td><td>Method, parameter, status code</td></tr><tr><td>Schema</td><td>Bagaimana bentuk data yang valid?</td><td>JSON Schema</td></tr><tr><td>Message</td><td>Data aktual apa yang dikirim?</td><td>Request/response JSON</td></tr><tr><td>Mapping</td><td>Bagaimana field diterjemahkan?</td><td><code>student_id → nim</code></td></tr><tr><td>Workflow</td><td>Bagaimana urutan prosesnya?</td><td>Consumer → API → database → response</td></tr><tr><td>Protocol</td><td>Aturan komunikasi apa yang dipakai?</td><td>HTTP/HTTPS</td></tr></tbody></table></section>
<section id="endpoint"><h2>4.4 Endpoint</h2><p><strong>Endpoint</strong> adalah titik alamat layanan yang dapat dipanggil consumer. Endpoint biasanya terdiri dari base URL, path, HTTP method, parameter, request, dan response.</p><div class="endpoint-anatomy"><span class="endpoint-method">GET</span><span>https://academic.test</span><b>/api/v1/students/</b><em>20240001</em></div><ul><li><strong>Protocol:</strong> HTTPS</li><li><strong>Base URL:</strong> <code>https://academic.test</code></li><li><strong>Version:</strong> <code>v1</code></li><li><strong>Resource:</strong> <code>students</code></li><li><strong>Identifier:</strong> <code>20240001</code></li></ul><p><code>/students/20240001</code> menunjuk resource tertentu melalui path. Sementara <code>/students?id=20240001</code> menggunakan query parameter, yang lebih umum dipakai untuk filter atau pencarian.</p><table class="rubric-table"><thead><tr><th>Method</th><th>Tujuan</th><th>Contoh</th></tr></thead><tbody><tr><td>GET</td><td>Membaca resource</td><td><code>GET /students</code></td></tr><tr><td>POST</td><td>Membuat resource</td><td><code>POST /students</code></td></tr><tr><td>PUT</td><td>Mengganti resource</td><td><code>PUT /students/20240001</code></td></tr><tr><td>PATCH</td><td>Memperbarui sebagian field</td><td><code>PATCH /students/20240001</code></td></tr><tr><td>DELETE</td><td>Menghapus resource</td><td><code>DELETE /students/20240001</code></td></tr></tbody></table><div class="exercise-box"><strong>Latihan identifikasi:</strong> <code>GET https://academic.test/api/v1/students/20240001</code>. Tuliskan protocol, base URL, version, resource, dan identifier sebelum membuka jawaban.</div></section>
<section id="contract"><h2>4.5 API Contract</h2><p>API contract adalah kesepakatan provider dan consumer tentang cara komunikasi. Contract tidak hanya berisi URL, tetapi juga method, parameter, header, content type, request, response, status code, validasi, dan error.</p><div class="artifact-pair"><div><strong>Provider</strong><span>Academic Service yang menyediakan endpoint</span></div><div class="pair-arrow">follows contract →</div><div><strong>Consumer</strong><span>Academic Consumer yang menggunakan endpoint</span></div></div><h3>Contract: GET /api/v1/students/{student_id}</h3><table class="rubric-table"><tbody><tr><th>Path parameter</th><td><code>student_id</code>: string, required</td></tr><tr><th>Accept</th><td><code>application/json</code></td></tr><tr><th>200</th><td>Response berisi object <code>data</code></td></tr><tr><th>404</th><td><code>{ "message": "Student not found" }</code></td></tr><tr><th>422</th><td><code>{ "message": "Validation error" }</code></td></tr></tbody></table>${codeBlock('docs/openapi.yaml',openApiCode)}<p>OpenAPI adalah salah satu cara menuliskan contract secara machine-readable. Contract menjadi acuan implementasi, testing, dan komunikasi lintas tim.</p></section>
<section id="schema"><h2>4.6 Schema</h2><p><strong>Schema</strong> adalah aturan struktur dan tipe data. Schema bukan data aktual. Ia menjelaskan property, type, required, format, nested object, dan array.</p>${codeBlock('docs/schema/student-response.schema.json',schemaJson)}<div class="callout"><strong>Bedakan tiga schema:</strong> database schema menjelaskan tabel, API schema menjelaskan bentuk payload endpoint, sedangkan JSON Schema adalah format formal untuk memvalidasi struktur JSON.</div><div class="exercise-box"><strong>Temukan kesalahan:</strong><pre><code>{ "data": { "student_id": 20240001, "email": "bukan-email" } }</code></pre><p>Petunjuk: periksa tipe <code>student_id</code>, format email, serta field wajib yang belum ada.</p></div></section>
<section id="message"><h2>4.7 Message</h2><p><strong>Message</strong> adalah data aktual yang dikirim melalui komunikasi. Schema adalah aturannya; message adalah contoh isi yang benar-benar dikirim.</p><div class="learning-grid"><div class="artifact-card"><strong>Request message</strong>${codeBlock('docs/messages/request-create-student.json',requestJson)}</div><div class="artifact-card"><strong>Response message</strong>${codeBlock('docs/messages/response-student.json',responseJson)}</div></div><p>Header penting: <code>Content-Type: application/json</code> menyatakan format body yang dikirim, sedangkan <code>Accept: application/json</code> menyatakan format response yang diharapkan.</p></section>
<section id="mapping"><h2>4.8 Mapping</h2><p>Mapping diperlukan ketika schema System A berbeda dari kebutuhan System B. Mapping dapat berupa rename, direct mapping, transformation, lookup, aggregation, splitting, filtering, atau default value.</p><table class="rubric-table"><thead><tr><th>System A</th><th>System B</th><th>Transformasi</th></tr></thead><tbody><tr><td>student_id</td><td>nim</td><td>direct / rename</td></tr><tr><td>name</td><td>nama</td><td>direct / rename</td></tr><tr><td>study_program</td><td>prodi</td><td>lookup: Teknologi Informasi → TI</td></tr><tr><td>email</td><td>email_address</td><td>rename</td></tr></tbody></table>${codeBlock('docs/mapping/student-mapping.md',mappingCode)}<p>Jangan menyebut data sudah terintegrasi hanya karena field berhasil dikirim. Consumer harus memahami makna dan transformasi field tersebut.</p></section>
<section id="workflow"><h2>4.9 Workflow</h2><p>Workflow menjelaskan urutan proses integrasi dari request sampai output. Workflow membantu kita melihat dependensi dan titik kegagalan.</p>${flow([['Consumer','membutuhkan data mahasiswa'],['HTTP Request','GET endpoint v1'],['Validation','request diperiksa'],['Database','query student'],['JSON Response','provider mengirim data'],['Mapping','consumer mengubah field'],['Output','data siap digunakan']])}<ol class="step-list"><li>System B membuat HTTP request.</li><li>Request dikirim ke endpoint System A.</li><li>System A memvalidasi parameter.</li><li>System A mengambil data dari database.</li><li>System A mengirim response JSON.</li><li>System B melakukan mapping dan menampilkan hasil.</li></ol></section>
<section id="protocol"><h2>4.10 Protocol</h2><p>Protocol adalah aturan komunikasi. <strong>HTTP/HTTPS adalah protocol</strong>. REST adalah architectural style, bukan protocol. JSON adalah format data/message, bukan protocol.</p><table class="rubric-table"><thead><tr><th>Protocol/Technology</th><th>Communication style</th><th>Typical use</th></tr></thead><tbody><tr><td>HTTP/HTTPS</td><td>Request-response</td><td>REST API</td></tr><tr><td>WebSocket</td><td>Persistent bidirectional</td><td>Realtime</td></tr><tr><td>MQTT</td><td>Publish-subscribe</td><td>IoT</td></tr><tr><td>AMQP</td><td>Message broker</td><td>Enterprise integration</td></tr><tr><td>SOAP</td><td>XML web service</td><td>Legacy/enterprise</td></tr></tbody></table></section>
<section id="hubungan"><h2>4.11 Hubungan Antar Artefak</h2><p>Hubungan ini membantu membongkar sebuah HTTP request, tetapi bukan urutan linear yang selalu kaku.</p>${flow([['HTTPS','protocol komunikasi'],['GET /api/v1','endpoint'],['Contract','aturan request-response'],['Schema','struktur valid'],['Message','data aktual'],['Mapping','penerjemahan'],['Workflow','proses lengkap']])}<div class="callout"><strong>Contoh analisis:</strong> Pada <code>GET /api/v1/students/20240001</code>, HTTPS menjelaskan cara komunikasi; endpoint menjelaskan tujuan; contract menjelaskan aturan; schema menjelaskan bentuk response; message adalah JSON aktual; mapping menyiapkan field untuk consumer; workflow menjelaskan keseluruhan urutannya.</div></section>
<section id="praktik"><h2>4.12 Praktik Terarah</h2><p>Ikuti urutan ini. Setiap tahap menghasilkan artefak yang digunakan tahap berikutnya.</p><ol class="step-list"><li>Siapkan PHP 8.3, Composer, MySQL/MariaDB atau SQLite, Postman, dan Git.</li><li>Buat Academic Service Laravel jika belum tersedia.</li><li>Buat tabel students dan seed minimal lima mahasiswa.</li><li>Buat endpoint versioned <code>/api/v1/students</code>.</li><li>Uji endpoint dengan curl dan Postman.</li><li>Tulis contract, schema, message, mapping, dan workflow.</li><li>Buat consumer sederhana yang melakukan mapping.</li></ol></section>
<section id="implementasi"><h2>4.13 Implementasi API</h2><p>Jika melanjutkan Student Service dari modul sebelumnya, gunakan project yang sama. Jangan membuat ulang project tanpa alasan.</p>${codeBlock('Terminal',`composer create-project laravel/laravel academic-service
cd academic-service
php artisan install:api
php artisan make:model Student -m
php artisan make:controller Api/V1/StudentController
php artisan migrate
php artisan db:seed
php artisan route:list`)}<h3>Model</h3><p><code>$fillable</code> membatasi field yang boleh diisi melalui mass assignment. Ini bagian dari keamanan implementasi API.</p>${codeBlock('app/Models/Student.php',modelCode)}<h3>Migration</h3>${codeBlock('database/migrations/xxxx_xx_xx_create_students_table.php',migrationCode)}<h3>Controller inti</h3>${codeBlock('app/Http/Controllers/Api/V1/StudentController.php',controllerCode)}<h3>Route versioning</h3>${codeBlock('routes/api.php',routeCode)}<p>Gunakan <code>student_id</code> sebagai identifier bisnis. API versioning <code>/api/v1</code> membantu provider memperkenalkan perubahan contract tanpa langsung memutus consumer lama.</p></section>
<section id="testing"><h2>4.14 Pengujian API</h2><p>Jalankan server dengan <code>php artisan serve</code>, lalu uji setiap request. Untuk setiap test, simpan request, response, expected result, dan artefak yang dapat diidentifikasi.</p><div class="test-grid"><div><strong>Test 1 — GET all</strong>${codeBlock('curl',`curl -X GET http://127.0.0.1:8000/api/v1/students
-H "Accept: application/json"`)}</div><div><strong>Test 2 — GET detail</strong>${codeBlock('curl',`curl -X GET http://127.0.0.1:8000/api/v1/students/20240001
-H "Accept: application/json"`)}</div><div><strong>Test 3 — Not found</strong>${codeBlock('curl',`curl -X GET http://127.0.0.1:8000/api/v1/students/99999999`)}</div><div><strong>Test 4 — POST valid</strong>${codeBlock('curl',`curl -X POST http://127.0.0.1:8000/api/v1/students
-H "Content-Type: application/json"
-d '{"student_id":"20240010","name":"Budi","study_program":"Teknologi Informasi","email":"budi@example.com"}'`)}</div></div><table class="rubric-table"><thead><tr><th>Test</th><th>Expected</th><th>Artefak diidentifikasi</th></tr></thead><tbody><tr><td>GET all/detail</td><td>200 JSON</td><td>endpoint, contract, schema, response message</td></tr><tr><td>GET nonexistent</td><td>404 JSON</td><td>error contract, message</td></tr><tr><td>POST valid</td><td>201 JSON</td><td>request message, validation, response</td></tr><tr><td>POST invalid</td><td>422 JSON</td><td>validation error contract</td></tr><tr><td>PUT/DELETE</td><td>200/204</td><td>method dan workflow perubahan</td></tr></tbody></table></section>
<section id="identifikasi"><h2>4.15 Identifikasi Artefak</h2><div class="exercise-box"><p><strong>Request:</strong> <code>POST https://academic.example/api/v1/students</code></p><p><strong>Headers:</strong> <code>Content-Type: application/json</code></p>${codeBlock('body.json',requestJson)}<ol><li>Protocol apa yang digunakan?</li><li>Apa endpoint dan HTTP method-nya?</li><li>Di mana contract-nya dijelaskan?</li><li>Schema apa yang memvalidasi body?</li><li>Bagian mana yang disebut message?</li><li>Mapping apa yang diperlukan jika consumer memakai field <code>nim</code>?</li><li>Bagaimana workflow request tersebut?</li></ol><details><summary>Lihat pembahasan</summary><p>Protocol: HTTPS. Method: POST. Endpoint: <code>/api/v1/students</code>. Contract: aturan POST dan response. Schema: struktur field body. Message: JSON aktual. Mapping: <code>student_id → nim</code>. Workflow: consumer → endpoint → validation → database → response.</p></details></div></section>
<section id="analisis"><h2>4.16 Analisis Hasil</h2><p>Lengkapi tabel analisis berikut berdasarkan hasil Postman/curl Anda.</p><table class="rubric-table"><thead><tr><th>Request</th><th>Status</th><th>Message</th><th>Schema/Contract sesuai?</th></tr></thead><tbody><tr><td>GET detail valid</td><td>____</td><td>____</td><td>____</td></tr><tr><td>GET tidak ditemukan</td><td>____</td><td>____</td><td>____</td></tr><tr><td>POST invalid</td><td>____</td><td>____</td><td>____</td></tr></tbody></table></section>
<section id="troubleshooting"><h2>4.17 Troubleshooting</h2><div class="learning-grid"><div class="learning-card"><strong>Connection refused</strong><p>Server belum berjalan, port salah, atau URL service tidak sesuai.</p></div><div class="learning-card"><strong>404 endpoint</strong><p>Periksa route, URL, prefix <code>v1</code>, dan HTTP method.</p></div><div class="learning-card"><strong>422 validation</strong><p>Field wajib kurang, email tidak valid, atau identifier duplikat.</p></div><div class="learning-card"><strong>500 server error</strong><p>Periksa exception, database, migration, dan log Laravel.</p></div><div class="learning-card"><strong>CORS</strong><p>Browser membatasi origin berbeda. Jelaskan origin client dan konfigurasi CORS secara eksplisit.</p></div></div></section>
<section id="challenge"><h2>4.18 Tantangan Pengembangan</h2><p>Buat <strong>Academic Consumer</strong> sederhana yang memanggil <code>GET /api/v1/students/20240001</code>, lalu mengubah response berikut:</p><p><code>student_id → nim</code>, <code>name → nama</code>, <code>study_program → prodi</code>, <code>email → email_address</code>.</p><p>Consumer harus memiliki timeout dasar, menangani 404 dan 500, serta menampilkan hasil mapping. Gunakan Laravel HTTP Client jika consumer dibuat dengan Laravel.</p><div class="callout"><strong>Luaran challenge:</strong> screenshot endpoint, contract, schema, request/response message, mapping table, workflow diagram, protocol analysis, dan evidence testing.</div></section>
<section id="quiz"><h2>4.19 Quiz Artefak Integrasi</h2><form class="artifact-quiz" data-artifact-quiz>${[['Pada GET /api/v1/students/123 melalui HTTPS, manakah protocol-nya?',['JSON','HTTPS','students','GET'],1],['Apa perbedaan schema dan message?',['Schema adalah data aktual; message adalah aturan','Schema adalah aturan struktur; message adalah data aktual','Keduanya sama','Schema hanya untuk database'],1],['REST termasuk apa?',['Protocol jaringan','Format data','Gaya arsitektur','Database'],2],['JSON termasuk apa?',['Protocol','Format data/message','Endpoint','Workflow'],1],['Artefak yang menjelaskan request, response, status code, dan validasi adalah...',['Mapping','API contract','Database schema','Queue'],1],['student_id → nim adalah contoh...',['Mapping','Protocol','Workflow','Endpoint'],0],['Status code untuk resource tidak ditemukan adalah...',['200','201','404','500'],2],['Content-Type application/json menjelaskan...',['Format body','Alamat endpoint','Database','Authorization role'],0],['Urutan provider validation → query → response merupakan...',['Schema','Message','Workflow','Mapping'],3],['Mengapa API versioning digunakan?',['Menghapus database','Menghindari perubahan contract memutus consumer','Mengubah JSON menjadi XML','Menghilangkan testing'],1]].map((q,i) => `<fieldset><legend>${i+1}. ${esc(q[0])}</legend>${q[1].map((option,j) => `<label><input type="radio" name="artifact-q${i}" value="${j}"> ${esc(option)}</label>`).join('')}</fieldset>`).join('')}<button class="button" type="submit">Periksa jawaban</button><p data-artifact-result class="quiz-result"></p></form></section>
<section id="checklist"><h2>4.20 Checklist Kompetensi</h2><div class="checklist">${['Saya dapat mengidentifikasi endpoint dan HTTP method.','Saya dapat membaca API contract.','Saya dapat membaca JSON Schema.','Saya dapat membedakan schema dan message.','Saya dapat membuat request/response message.','Saya dapat membuat data mapping.','Saya dapat menggambarkan workflow.','Saya dapat mengidentifikasi protocol.','Saya dapat melakukan API testing.','Saya dapat menjelaskan hubungan seluruh artefak.'].map((text) => `<label><input type="checkbox" data-artifact-check> ${text}</label>`).join('')}</div></section>
<section id="refleksi"><h2>4.21 Refleksi</h2><ol><li>Mengapa endpoint saja belum cukup untuk membangun integrasi?</li><li>Apa perbedaan API contract dan schema?</li><li>Apa perbedaan schema dan message?</li><li>Mengapa mapping diperlukan?</li><li>Apa yang dimaksud workflow integrasi?</li><li>Apakah REST merupakan protocol? Jelaskan.</li><li>Apakah JSON merupakan protocol? Jelaskan.</li><li>Bagaimana Anda mengidentifikasi artefak dari dokumentasi API?</li></ol></section>`;
  function render(){ document.title='Modul 4 — Identifikasi Artefak Integrasi Sistem · UNIMUGO CodeLab'; document.querySelector('#app').innerHTML=`<header class="module-topbar"><a class="module-brand" href="${base}index.html"><span class="brand-mark">UG</span><span>UNIMUGO CodeLab</span></a><span class="module-title">Integrasi Sistem / Modul 4</span><a class="module-catalog" href="../../index.html">Daftar modul</a></header><div class="content-page"><aside class="module-sidebar"><button class="sidebar-toggle" type="button" aria-expanded="false">Navigasi materi <span>⌄</span></button><div class="sidebar-content"><div class="sidebar-label">Modul 4 dari 16</div><nav><a href="#tujuan">Tujuan</a><a href="#peta">Peta artefak</a><a href="#endpoint">Endpoint</a><a href="#contract">Contract</a><a href="#schema">Schema</a><a href="#message">Message</a><a href="#mapping">Mapping</a><a href="#workflow">Workflow</a><a href="#praktik">Praktik</a><a href="#testing">Testing</a><a href="#quiz">Quiz</a><a href="#checklist">Checklist</a></nav></div></aside><header class="module-header"><div class="breadcrumb"><a href="${base}index.html">Home</a> / <a href="../../index.html">Integrasi Sistem</a> / Modul 4</div><span class="pill">Minggu 4 · Guided lab</span><h1>Identifikasi Artefak Integrasi Sistem</h1><p class="muted">Mengurai endpoint, contract, schema, message, mapping, workflow, dan protocol dari sebuah integrasi API.</p><div class="progress-track"><span data-progress-bar></span></div><small data-progress-label>0% · Belum dimulai</small></header><main>${content()}<nav class="module-nav"><a href="../modul-03-integration-architecture/index.html">← Modul 3</a><a href="../modul-05-data-integration-transformation/index.html">Modul 5 →</a></nav></main></div>`; bind(); }
  function bind(){ const key='integration-artifacts-04'; const checks=[...document.querySelectorAll('[data-artifact-check]')]; const saved=JSON.parse(localStorage.getItem(key)||'{}'); checks.forEach((check,index)=>{check.checked=!!saved[index];check.addEventListener('change',save);}); document.querySelectorAll('.copy-code').forEach((button)=>button.addEventListener('click',()=>{navigator.clipboard?.writeText(button.parentElement.querySelector('code').textContent);button.textContent='Tersalin';setTimeout(()=>button.textContent='Salin',1200);})); document.querySelector('.sidebar-toggle')?.addEventListener('click',()=>document.querySelector('.module-sidebar').classList.toggle('is-open')); document.querySelector('[data-artifact-quiz]')?.addEventListener('submit',(event)=>{event.preventDefault();const correct=[1,1,2,1,1,0,2,0,3,1];const score=correct.reduce((total,answer,index)=>total+(Number(new FormData(event.target).get(`artifact-q${index}`))===answer?1:0),0);document.querySelector('[data-artifact-result]').textContent=`${score}/10 benar. ${score>=8?'Lulus — lanjutkan ke Modul 5.':'Baca kembali peta artefak dan coba lagi.'}`;}); function save(){const state={};checks.forEach((check,index)=>state[index]=check.checked);localStorage.setItem(key,JSON.stringify(state));update();} function update(){const done=checks.filter((check)=>check.checked).length;const percent=Math.round(done/checks.length*100);document.querySelector('[data-progress-bar]').style.width=`${percent}%`;document.querySelector('[data-progress-label]').textContent=`${percent}% · ${percent===100?'Selesai':'Sedang dipelajari'}`;} update(); }
  render();
})();
