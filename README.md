# News House — Misi Detektif Berita

News House adalah media pembelajaran interaktif Bahasa Indonesia kelas VII dengan konsep permainan detektif berita. Peserta didik belajar memahami unsur **ADIKSIMBA** melalui tiga cara: membaca, mengamati video, dan menyimak audio.

Aplikasi dibangun menggunakan HTML, CSS, dan JavaScript murni. Tidak ada framework, package manager, database, ataupun proses build yang diperlukan.

## Fitur utama

- Onboarding dan petunjuk pembelajaran dengan efek ketik serta audio.
- Tiga jalur pembelajaran: **Meja Baca**, **Meja Amati**, dan **Meja Simak**.
- Materi, contoh, Ruang Bedah, Ruang Ekspresi, Ruang Revisi, dan kunci jawaban untuk setiap meja.
- Pemutar video dan audio lokal dengan kontrol play/pause.
- Autosave jawaban serta progres pembelajaran melalui `localStorage` browser.
- Sistem gembok misi: misi sebuah meja baru terbuka setelah seluruh bagian pembelajaran meja tersebut pernah dikunjungi.
- Unggah tugas melalui folder Google Drive.
- Daftar sumber materi, berita, video, dan audio pada halaman media terkait.
- Modal keberhasilan, efek suara, dan halaman penutup pembelajaran.
- Dukungan navigasi keyboard dasar dan preferensi `prefers-reduced-motion`.

## Alur pembelajaran

```text
Landing Page
  → Onboarding
  → Ruang Redaksi / Pilih Meja
  → Materi dan Contoh
  → Ruang Bedah
  → Ruang Ekspresi
  → Ruang Revisi
  → Kunci Jawaban
  → Ruang Misi
  → Misi Meja
  → Misi Selesai
```

Masing-masing jalur Baca, Amati, dan Simak memiliki progres terpisah. Kartu misi hanya terbuka jika semua halaman wajib pada jalur tersebut sudah dikunjungi.

## Teknologi

- HTML5
- CSS3
- JavaScript ES Modules
- Web Audio dan HTML Media API
- Browser `localStorage`
- Font lokal Baloo 2

## Persyaratan

- Browser desktop modern, disarankan Google Chrome atau Microsoft Edge versi terbaru.
- Lebar viewport minimal 1100 piksel. Tampilan utama menggunakan panggung 16:9 agar komposisi visual tetap konsisten.
- Salah satu server HTTP lokal. Python, Node.js, atau ekstensi Live Server dapat digunakan.
- Koneksi internet diperlukan hanya untuk membuka sumber eksternal dan folder unggahan Google Drive.

## Cara menjalankan

Halaman tidak boleh dibuka dengan mengeklik `index.html` secara langsung karena aplikasi memuat partial HTML melalui `fetch()`. Jalankan proyek melalui server HTTP lokal.

### Opsi 1 — Python

Buka terminal di folder proyek, kemudian jalankan:

```powershell
cd path\to\News-House
py -m http.server 8000
```

Jika perintah `py` tidak tersedia, gunakan:

```powershell
python -m http.server 8000
```

Lalu buka [http://localhost:8000](http://localhost:8000) di browser.

### Opsi 2 — Node.js

Jika Node.js sudah terpasang:

```powershell
cd path\to\News-House
npx.cmd --yes serve .
```

Buka alamat lokal yang ditampilkan oleh terminal, biasanya `http://localhost:3000`.

### Opsi 3 — VS Code Live Server

1. Buka folder proyek di VS Code.
2. Pasang ekstensi **Live Server** jika belum tersedia.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.

Untuk menghentikan server Python atau Node.js, kembali ke terminal lalu tekan `Ctrl+C`.

## Struktur proyek

```text
News-House/
├── index.html                  # Shell aplikasi dan pemuatan stylesheet/module
├── pages/                      # Partial HTML setiap halaman
├── scripts/
│   ├── app.js                  # Navigasi, progres, misi, modal, dan bootstrap
│   ├── components/             # Audio manager, typewriter, dan penyimpanan jawaban
│   └── *.js                    # Interaksi khusus setiap meja/ruangan
├── styles/
│   ├── base.css                # Font, token warna, dan aturan global
│   ├── components.css          # Komponen bersama
│   └── *.css                   # Tata letak khusus setiap halaman
└── assets/
    ├── audio/                  # Musik, efek suara, dan materi audio
    ├── fonts/                  # Font lokal
    ├── images/                 # Background, papan, tombol, dan ilustrasi
    ├── references/             # Aset referensi desain
    └── video/                  # Materi, contoh, bedah, dan video misi
```

## Progres dan penyimpanan data

Semua data disimpan hanya di browser pengguna:

- Jawaban Ruang Ekspresi dan Ruang Revisi disimpan otomatis di `localStorage`.
- Status halaman yang sudah dibuka juga disimpan di `localStorage` dan digunakan untuk membuka kartu misi.
- Tidak ada data yang dikirim ke server aplikasi.
- Menghapus data situs/browser akan menghapus jawaban dan mengunci kembali progres misi.

Untuk mengulang progres dari awal, buka Developer Tools browser, masuk ke **Application → Local Storage**, lalu hapus data untuk alamat lokal proyek. Cara yang lebih cepat adalah menjalankan aplikasi dalam jendela Incognito/InPrivate baru.

## Catatan penggunaan untuk pengajar

- Kunci jawaban pada Ruang Revisi dilindungi validasi sisi klien dengan kata sandi `BedahSatu`.
- Kata sandi tersebut berfungsi sebagai pembatas alur pembelajaran, bukan sebagai sistem keamanan karena seluruh aplikasi berjalan di browser.
- Tombol unggah membuka folder Google Drive eksternal. Hak akses folder perlu dipastikan mengizinkan peserta didik mengunggah berkas.
- Beberapa browser memblokir autoplay audio. Pengguna perlu melakukan interaksi pertama, misalnya menekan tombol **Masuk**, sebelum suara dapat diputar.

## Sumber materi dan media

Sumber juga ditampilkan langsung di bawah media terkait dalam aplikasi.

### Meja Baca

- Materi ADIKSIMBA: *Buku Bahan Ajar Bahasa Indonesia Kelas VII Berbasis Kurikulum Merdeka dan Modul Ajar*.
- Contoh berita: [Tribun Pekanbaru — Diguyur Hujan Sekitar Satu Jam, Sejumlah Titik di Pekanbaru Terendam Banjir](https://pekanbaru.tribunnews.com/adv/1119182/diguyur-hujan-sekitar-satu-jam-sejumlah-titik-di-pekanbaru-terendam-banjir-dprd-benahi-drainase).
- Ruang Bedah: [YouTube](https://youtu.be/boe83305-bs?si=GmpMzrWso6Zbqrbz).

### Meja Amati dan Meja Simak

- Materi: [YouTube](https://youtu.be/X-WFP0ITMO4?si=k6oKSAPmQ_nTrXBI).
- Contoh: [YouTube](https://youtu.be/Ppv5wz_i1Fk?si=H7GcMabPkCNvxlOl).
- Ruang Bedah: [YouTube](https://youtu.be/boe83305-bs?si=GmpMzrWso6Zbqrbz).
- Media misi: [YouTube](https://youtu.be/-4KlYwv4fwI?si=HisZ15B4cci0WHoI).

## Pemeriksaan cepat setelah perubahan

Setelah mengubah kode atau aset, periksa hal berikut:

1. Landing page dapat dibuka tanpa error di Console browser.
2. Onboarding dapat diselesaikan dan menuju Ruang Redaksi.
3. Materi, contoh, audio, serta video dapat diputar.
4. Audio Materi dan Contoh di Meja Simak tidak berbunyi bersamaan.
5. Jawaban tetap tersedia setelah halaman dimuat ulang.
6. Kartu misi tetap terkunci sampai semua halaman wajib pada meja terkait dibuka.
7. Modal sukses dan pengalihan halaman berjalan dengan benar.
8. Tautan sumber dan tombol Google Drive membuka tab baru.

Pemeriksaan sintaks JavaScript utama dapat dijalankan dengan:

```powershell
node --check scripts/app.js
```

## Pemecahan masalah

### Halaman kosong atau partial tidak termuat

Pastikan aplikasi dibuka melalui `http://localhost:...`, bukan melalui alamat `file:///...`. Periksa juga apakah perintah server dijalankan dari folder `News-House`.

### Audio atau video tidak berbunyi

Klik tombol kontrol media atau tombol **Masuk** terlebih dahulu. Pastikan tab browser tidak dimatikan suaranya dan file di `assets/audio/` atau `assets/video/` masih tersedia.

### Perubahan CSS atau JavaScript belum terlihat

Lakukan hard refresh dengan `Ctrl+F5`. Jika masih menggunakan versi lama, hapus cache situs dari browser.

### Misi masih terkunci

Buka seluruh rangkaian halaman wajib pada meja terkait:

- Meja Baca: Materi, Ruang Bedah, Ruang Ekspresi, Ruang Revisi, dan kunci jawaban.
- Meja Amati: Materi, Contoh, Ruang Bedah, Ruang Ekspresi, Ruang Revisi, dan kunci jawaban.
- Meja Simak: Materi, Contoh, Ruang Bedah, Ruang Ekspresi, Ruang Revisi, dan kunci jawaban.

Progres harus dilakukan pada browser dan origin lokal yang sama.

### Jawaban atau progres hilang

Data browser dapat hilang setelah cache/data situs dihapus, saat memakai mode privat, atau ketika alamat server berubah—misalnya dari `localhost:8000` menjadi `localhost:3000`.

## Status proyek

Proyek dapat dijalankan secara lokal sebagai aplikasi pembelajaran statis. Seluruh aset utama tersimpan di dalam repositori, sedangkan tautan sumber dan unggahan membuka layanan eksternal.
