## Pola Arsitektur

Proyek ini dibangun dengan menerapkan **Module-Based Architecture (Arsitektur Berbasis Modul)**

Berikut adalah alasannya :

### 1. Prinsip Modularitas
Setiap fitur utama dalam aplikasi ini diisolasi ke dalam modulnya masing-masing (seperti `AuthModule`, `CustomersModule`, `EventsModule`, dan `BookingsModule`). 
* Setiap modul bersifat otonom dan memiliki komponen lengkap, mulai dari DTO, Entity, Controller, hingga Service sendiri.
* Pendekatan ini untuk mencegah terjadinya kode yang saling tumpang tindih. Jika terdapat perubahan logika bisnis atau penanganan kesalahan (bug fixing*) pada sistem `bookings`, dampaknya akan terisolasi di dalam modul tersebut dan tidak akan mengganggu stabilitas modul lainnya seperti `events` atau `customers`.

### 2. Separation of Concerns
Kode di dalam setiap modul dibagi secara tegas berdasarkan lapisan fungsi (layering) dengan tanggung jawab yang sangat spesifik:
* Controller Layer: Berfungsi secara eksklusif untuk menerima HTTP Request dari klien, memvalidasi data masukan melalui DTO, melakukan pemeriksaan keamanan melalui Guard (`JwtAuthGuard` & `RolesGuard`), serta mengembalikan HTTP Response. Lapisan ini tidak diperkenankan mengandung logika bisnis.
* Service Layer (Business Logic) : Merupakan pusat logika bisnis dari aplikasi. Seluruh kalkulasi dan aturan bisnis ditempatkan di sini, seperti proses validasi ketersediaan sisa kuota sebuah acara sebelum data pemesanan (booking) diizinkan untuk disimpan.
* Entity/Repository Layer (Data Access): Lapisan yang bertanggung jawab penuh untuk melakukan interaksi dan eksekusi query secara langsung ke database SQL dengan memanfaatkan Object-Relational Mapping (ORM) dari TypeORM.

### 3. Scalability & Maintainability
Melalui pengorganisasian kode yang rapi berbasis domain atau fitur, aplikasi ini menjadi sangat adaptif terhadap pengembangan di masa mendatang. Apabila di kemudian hari sistem membutuhkan fitur tambahan seperti modul pembayaran (payment) atau ulasan (review), tim pengembang cukup menambahkan modul baru tanpa harus mengubah atau memodifikasi struktur kode inti yang sudah berjalan.

### 4. Kemudahan Pengujian Kode (Testability)
Pemisahan lapisan yang terstruktur memberikan kemudahan yang signifikan dalam implementasi pengujian otomatis (automated testing):