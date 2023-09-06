# todo-app

```markdown
# Aplikasi Todo

Aplikasi Todo adalah sebuah aplikasi manajemen tugas sederhana yang memungkinkan Anda untuk mencatat dan mengelola daftar tugas Anda.

## Panduan Instalasi

Untuk menjalankan aplikasi ini di komputer lokal Anda, ikuti langkah-langkah berikut:

### Klien (Client)

1. Buka terminal dan pindahkan direktori ke folder klien.
2. Jalankan perintah berikut untuk menginstal dependensi:

   ```bash
   npm install
   ```

3. Setelah instalasi selesai, jalankan klien dengan perintah:

   ```bash
   npm run start
   ```

4. Buka browser Anda dan akses [http://localhost:3000](http://localhost:3000) untuk mengakses aplikasi klien.

### Server

1. Buka terminal dan pindahkan direktori ke folder server.
2. Jalankan perintah berikut untuk menginstal dependensi:

   ```bash
   npm install
   ```

3. Setelah instalasi selesai, jalankan server dengan perintah:

   ```bash
   npm run start
   ```

4. Server akan berjalan di [http://localhost:3030](http://localhost:3030).

## Cara Penggunaan

Setelah Anda menjalankan klien dan server, Anda dapat menggunakan aplikasi dengan cara berikut:

### Registrasi

1. Buka aplikasi dan klik tombol "Sign Up".
2. Isi formulir registrasi dengan email tiruan dan password.
3. Klik tombol "Submit" untuk mendaftar.

### Masuk

1. Setelah registrasi berhasil, Anda dapat masuk dengan menggunakan email dan password yang Anda daftarkan.

### Dashboard

Setelah masuk, Anda akan melihat dashboard dengan komponen-komponen berikut:

#### Header

- Tombol "Add New": Untuk menambahkan tugas baru, masukkan nama tugas dan tekan tombol "Submit" untuk merekam penambahan Anda.
- Tombol "Sign Out": Untuk keluar dari aplikasi dan kembali ke halaman login/sign up.

#### List

- Tombol "Edit": Untuk memperbarui tugas yang telah Anda buat sebelumnya, tekan tombol "Submit" untuk mengkonfirmasi perubahan.
- Tombol "Delete": Untuk menghapus tugas yang mungkin telah Anda selesaikan atau sudah tidak dibutuhkan lagi.

## Demo

Anda dapat mengakses demo aplikasi [di sini](https://todo-app-client-2mn5w.kinsta.app/).

## Pertanyaan Binar

### Apa Kegunaan JSON pada REST API?

JSON (JavaScript Object Notation) adalah format data ringan yang digunakan dalam REST API untuk merepresentasikan struktur data yang dikirim atau diterima melalui API. JSON memiliki format yang mudah dibaca dan dipahami oleh manusia, ringan untuk transmisi data, kompatibel dengan berbagai bahasa pemrograman, dan dapat digunakan di berbagai platform.

### Bagaimana REST API Bekerja?

REST API berfungsi dengan cara berkomunikasi dengan sumber daya (misalnya, data) melalui metode HTTP seperti GET (ambil data), POST (buat data baru), PUT (perbarui data), dan DELETE (hapus data). Data dikirim dan diterima dalam format seperti JSON atau XML. Setiap operasi harus lengkap dan tidak bergantung pada operasi sebelumnya. API memiliki endpoint (URI) yang digunakan untuk mengakses sumber daya, dan respons dari server mengandung status code yang mengindikasikan apakah permintaan berhasil atau gagal.

```
