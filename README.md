# News House

Media pembelajaran Bahasa Indonesia kelas VII dengan tema game detektif berita. Proyek ini menggunakan HTML, CSS, dan JavaScript biasa tanpa dependensi tambahan.

## Struktur folder

- `index.html` — shell aplikasi dan daftar stylesheet.
- `pages/` — markup landing, onboarding, Ruang Redaksi, meja pembelajaran, dan Ruang Bedah Teks.
- `scripts/components/` — perilaku komponen bersama seperti typewriter dan pengelola audio.
- `scripts/` — bootstrap aplikasi dan modul interaksi setiap halaman.
- `styles/` — token dasar, komponen bersama, serta style khusus setiap modul.
- `assets/images/` — gambar yang dikelompokkan berdasarkan halaman atau modul.
- `assets/images/button/` — aset tombol lokal.
- `assets/audio/` — musik latar dan efek klik.
- `assets/fonts/` — font lokal Baloo 2.
- `assets/references/` — aset referensi asli yang dipertahankan.

## Cara menjalankan

Karena halaman memuat partial HTML dengan `fetch`, jalankan server HTTP lokal dari folder proyek. Contoh:

```powershell
py -m http.server 8000
```

Buka `http://localhost:8000` di browser.

## Alur saat ini

Landing page → briefing tiga tahap → Ruang Redaksi → pilihan meja → Ruang Bedah Teks → Ruang Ekspresi → Ruang Revisi → Hasil Bedah → Ruang Misi. Jawaban Ruang Ekspresi dan Ruang Revisi menggunakan autosave browser yang sama, sehingga perubahan selalu tersinkron. Halaman Hasil Bedah menampilkan kunci ADIKSIMBA dalam susunan 3 × 2. Ruang Misi menampilkan tiga kartu misi yang terbuka setelah meja terkait pernah dikunjungi dan masing-masing mengarah ke halaman Misi Meja Baca, Misi Meja Amati, atau Misi Meja Simak.
