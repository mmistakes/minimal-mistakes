# Catatan Proyek: Web Portofolio

## Ringkasan
Situs portofolio pribadi di GitHub Pages, fork tema Jekyll Minimal Mistakes.
Static saja (tanpa backend). Tema tidak akan diupdate dari upstream, boleh edit file mana pun.

## Struktur teknis
- index.html: halaman pilih bahasa (3 kartu) + redirect otomatis sesuai bahasa browser
- _pages/: halaman per bahasa (/id/main/, /en/main/, /ja/main/)
- Kode bahasa yang dipakai: id, en, ja (bukan jp)
- Site title: "Main Page"

## Mapping web (target akhir)
Isi semua bahasa SAMA. Pilihan bahasa cuma mengganti bahasa tampilan.
Ini target akhir, tidak semua halaman sudah ada (lihat "Status fitur").

```
mizoarkatamarenaldy.github.io/
│
├── (root) Halaman pilih bahasa
│     3 kartu: bendera + nama bahasa
│     judul "choose your language" dalam 3 bahasa
│
└── /id/  /en/  /ja/   (isi sama, cuma beda bahasa)
      │
      ├── HOME (/main/)
      │     ├── Nama lengkap + ringkasan tentang diri
      │     ├── Motto 3E (Equilibrium Equivalence Equity)
      │     │     teksnya sendiri jadi link ke halaman 3E,
      │     │     ada tanda saat kursor diarahkan (hover)
      │     ├── [buka-tutup] Main Portfolio
      │     │     ├── Psikologi
      │     │     ├── HR
      │     │     └── Bahasa Jepang
      │     └── [buka-tutup] Additional Portfolio
      │           ├── Coding
      │           ├── Data Analysis
      │           ├── Design
      │           ├── Illustration
      │           ├── Writing
      │           ├── Music
      │           ├── Second Brain
      │           ├── Sport
      │           └── Cooking
      │
      ├── 3E (detail framework, halaman terpisah)
      │
      ├── About
      │     ├── Latar belakang dan pengalaman hidup
      │     └── CV
      │
      ├── Contact
      │     └── Semua sosmed (termasuk LinkedIn) + beberapa channel YouTube
      │
      └── Easter egg Kanade (tersembunyi)
            ├── URL berisi kanji 奏, kanji di-blend ke background
            ├── Penjelasan kenapa Kanade penting buat pemilik
            ├── Link keluar ke Fandom wiki (tanpa gambar/chibi)
            ├── Ada di tiga bahasa, isi sama
            └── (opsional, belum pasti) fanfic
```

Aturan mapping:
- Main Portfolio = 3 halaman terpisah (Psikologi, HR, Bahasa Jepang), karena kontennya banyak.
- Additional Portfolio = 9 halaman, namanya sederhana (bukan istilah taksonomi skill).
- Elemen buka-tutup dipakai di HOME saja. Pakai tag `<details>` (tanpa JavaScript).
  Kalau isinya Markdown, tambahkan `markdown="1"` di tag `<details>`.
- Konten paling mentok: embed video YouTube atau foto yang ditempel langsung.
- Slug URL tiap sub-halaman mengacu ke bagian "Slug URL" di bawah sebagai sumber yang berlaku.

## Slug URL
Sama di semua bahasa, huruf kecil, bahasa Inggris. `{lang}` = `id`, `en`, `ja`.
File di `_pages/` bernama `{lang}-{slug}.md`, `/` di slug diganti `-`
(contoh: `id-3e.md`, `id-portfolio-psychology.md`).

| Halaman | Slug |
|---|---|
| HOME | `/{lang}/main/` |
| 3E | `/{lang}/3e/` |
| About | `/{lang}/about/` |
| Contact | `/{lang}/contact/` |
| Main Portfolio: Psikologi | `/{lang}/portfolio/psychology/` |
| Main Portfolio: HR | `/{lang}/portfolio/hr/` |
| Main Portfolio: Bahasa Jepang | `/{lang}/portfolio/japanese/` |
| Additional: Coding | `/{lang}/portfolio/coding/` |
| Additional: Data Analysis | `/{lang}/portfolio/data-analysis/` |
| Additional: Design | `/{lang}/portfolio/design/` |
| Additional: Illustration | `/{lang}/portfolio/illustration/` |
| Additional: Writing | `/{lang}/portfolio/writing/` |
| Additional: Music | `/{lang}/portfolio/music/` |
| Additional: Second Brain | `/{lang}/portfolio/second-brain/` |
| Additional: Sport | `/{lang}/portfolio/sport/` |
| Additional: Cooking | `/{lang}/portfolio/cooking/` |



## Keputusan
- Bahasa: Indonesia, English, Jepang
- Halaman pilih bahasa tetap bisa dibuka manual lewat /?pilih
- Salam pembuka tiap halaman ditulis manual oleh pemilik, jangan diubah agent

## Gotcha (jangan diulang)
- Jangan pakai include_cached untuk masthead, karena teksnya beda per bahasa
  (dulu bikin tombol "ganti bahasa" selalu berbahasa Inggris).
- Verifikasi Discord memakai `.well-known/discord` dengan `include: [".well-known"]` di _config.yml, dan jangan pernah menambah .nojekyll karena situs ini butuh Jekyll.

## Status fitur
- [x] Halaman pilih bahasa
- [x] Halaman tujuan per bahasa
- [x] Tombol ganti bahasa (dinamis membawa ke halaman setara)
- [x] Redirect otomatis sesuai bahasa browser
- [x] Isi HOME (ringkasan diri, motto 3E sebagai link, dua bagian buka-tutup)
- [x] Link dari HOME ke semua sub-halaman (3E, 12 portofolio, About, Contact) lewat tombol
- [/] Halaman 3E — kerangka selesai, isi menunggu Mizo
- [/] Halaman About (latar belakang, pengalaman hidup, CV) — kerangka selesai, isi menunggu Mizo
- [/] Halaman Contact — kerangka selesai, isi menunggu Mizo
- [/] Halaman Main Portfolio (Psikologi, HR, Bahasa Jepang) — kerangka selesai, isi menunggu Mizo
- [/] Halaman Additional Portfolio (9 halaman) — kerangka selesai, isi menunggu Mizo
- [/] Easter egg Kanade (3 bahasa) — kerangka selesai, teks masih [TEKS DARI MIZO]
- [x] Desain visual dan warna theme (unsur Kanade)

## Aturan untuk agent
- Kerjakan satu tugas per sesi.
- Jangan ubah file di luar tugas.
- Di akhir, kabari file apa saja yang diubah.
- Di akhir tugas, tambahkan satu entri di `HISTORY.md` (paling atas): nomor, judul singkat, tanggal, file yang diubah, alasan. Jangan ubah entri lama. Kalau tidak yakin tanggalnya, tulis "tidak tercatat", jangan menebak.
- Sebelum menulis daftar file di entri HISTORY.md, jalankan `git status --short` dan tulis hanya file yang muncul di sana. Jangan commit dan jangan push, itu dikerjakan pemilik. Kalau ada file yang muncul di status tapi bukan bagian dari tugas ini, laporkan ke pemilik, jangan dimasukkan ke entri. Kalau daftar file tidak diketahui, tulis "tidak tercatat".
- Di akhir tugas, tulis saran pesan commit lengkap untuk pemilik, termasuk dua baris trailer di bawah, dipisah satu baris kosong dari isi pesan. Agent tidak menjalankan git commit. Pemilik yang commit.
  Co-authored-by: Claude <noreply@anthropic.com>
  Co-authored-by: Gemini (Antigravity) <200291788+gemini-code-assist@users.noreply.github.com>
- Aturan tema:
  - Layout halaman bebas dan boleh berbeda-beda. Yang wajib sama di semua halaman hanya palet warnanya (palet Kanade).
  - Palet tersedia sebagai CSS custom properties (`:root { --kanade-... }`) lewat `assets/css/kanade-palette.css` (hasil kompilasi Jekyll dari `assets/css/kanade-palette.scss`). File skin dan semua halaman mengambil warna dari sini.
  - Setiap halaman atau layout baru, termasuk yang tanpa layout Minimal Mistakes, wajib memuat `kanade-palette.css`.
  - Dilarang warna hardcode (`#fff`, `white`, `black`, kode hex) di halaman, include, atau CSS baru. Pakai variabel palet. Butuh warna baru? Tambah dulu ke `_kanade.scss` dan tambah variabel baru di `kanade-palette.scss`.

## Skin Kanade
- Nama skin: `kanade`
- File skin: `_sass/minimal-mistakes/skins/_kanade.scss`
- Sumber palet warna: `index.html` (halaman pilih bahasa)
  - Background: `#121016` (ungu-hitam gelap)
  - Teks: `#EDEAF0` (lavender terang)
  - Aksen/primary: `#BB6588` (pink Kanade)
- Diaktifkan via `_config.yml` → `minimal_mistakes_skin: "kanade"`

### Arsitektur kanade-palette.css
**Status: sudah ada** (dibuat sesi #5, 2026-09-21)

- `_kanade.scss` = satu-satunya tempat nilai warna hex ditulis (variabel SCSS: `$background-color`, `$text-color`, `$primary-color`).
- `assets/css/kanade-palette.scss` = file SCSS dengan front matter Jekyll. Mengimport `_kanade.scss`, lalu emit `:root { --kanade-bg; --kanade-text; --kanade-accent }` via interpolasi `#{}`. Dikompilasi oleh Jekyll menjadi `assets/css/kanade-palette.css`.
- Halaman Minimal Mistakes memuat `kanade-palette.css` via `<link>` di `_includes/head/custom.html`.
- Halaman standalone HTML memuat `kanade-palette.css` via `<link>` langsung.
- **Jangan tulis hex di `kanade-palette.scss`** — nilai warna hanya boleh ada di `_kanade.scss`.

### Gotcha saat pembuatan skin
- Tidak ada warna hardcode di `_includes/`, `_layouts/`, atau `_pages/`.
  Semua modul SCSS Minimal Mistakes sudah pakai variabel, jadi cukup
  override variabel di file skin saja.
- File `_includes/head/custom.html` semula kosong; sekarang berisi `<link>` ke `kanade-palette.css`.
- Jika nanti menambah CSS custom (misal untuk elemen buka-tutup `<details>`
  atau easter egg), gunakan variabel `--kanade-bg`, `--kanade-text`, `--kanade-accent`,
  atau variabel SCSS `$background-color`, `$text-color`, `$primary-color` — jangan hardcode.
