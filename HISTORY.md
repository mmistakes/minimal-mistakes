# History Perubahan

Log perubahan web portofolio yang dikerjakan lewat Antigravity.

Aturan:
- Terbaru di atas. Satu entri = satu tugas/sesi.
- Format: nomor, judul singkat, tanggal, file, alasan.
- Jangan ubah entri lama. Kalau ada koreksi, tulis entri baru.
- Yang tidak diketahui ditulis "tidak tercatat", jangan menebak.

---

## #8 | isi HOME (id, en, ja)
- Tanggal: 2026-10-03
- File: `CATATAN.md`, `HISTORY.md`, `_includes/head/custom.html`, `_pages/en-main.md`, `_pages/id-main.md`, `_pages/ja-main.md`
- Alasan: mengisi HOME di tiga bahasa dengan isi yang sama: nama lengkap + ringkasan (placeholder [TEKS DARI MIZO]), motto 3E sebagai link (href sementara `#`, ada tooltip `title` dan perubahan warna/garis bawah + panah saat hover), serta dua bagian buka-tutup `<details markdown="1">` (Main Portfolio 3 item, Additional Portfolio 9 item, belum ada link karena slug belum ditentukan). CSS baru di `_includes/head/custom.html` hanya memakai `--kanade-text` dan `--kanade-accent`. Salam pembuka tidak diubah.
- Catatan: render belum diverifikasi lokal (Ruby/Jekyll tidak terpasang di mesin agent). Cek tampilan setelah push.

## #7 | perbaiki aturan verifikasi file
- Tanggal: 2026-10-03
- File: `CATATAN.md`, `HISTORY.md`
- Alasan: mengganti aturan verifikasi daftar file dari `git show` menjadi `git status --short` di CATATAN.md karena commit dan push dikerjakan oleh pemilik (belum ada commit saat agent selesai).

## #6 | kerangka easter egg Kanade
- Tanggal: 2026-09-21
- File: `奏/index.html`, `奏/id/index.html`, `奏/en/index.html`, `奏/ja/index.html`, `_pages/id-main.md`, `_pages/en-main.md`, `_pages/ja-main.md`, `CATATAN.md`
- Alasan: kerangka halaman rahasia easter egg Kanade — URL berkanji 奏, 3 bahasa (id/en/ja), redirect otomatis berdasarkan bahasa browser, noscript fallback. Kanji 奏 ditaruh di pojok kanan bawah halaman home (position: fixed), warna menyatu dengan background, muncul samar saat hover. Semua teks konten masih placeholder [TEKS DARI MIZO].
- Catatan: file list belum diverifikasi dengan `git show --name-only` (belum di-commit). Verifikasi setelah push.

## #5 | buat kanade-palette.scss + koreksi #4
- Tanggal: 2026-09-21
- File: `assets/css/kanade-palette.scss`, `_includes/head/custom.html`, `CATATAN.md`
- Alasan: `kanade-palette.css` di entri #4 ternyata tidak pernah dibuat (tidak ada di commit `a73609f6`). Dibuat sekarang sebagai SCSS dengan front matter Jekyll yang mengimport `_kanade.scss` dan mengekspornya sebagai CSS custom properties (`:root { --kanade-bg; --kanade-text; --kanade-accent }`), sehingga warna tidak ditulis dua kali.
- Catatan koreksi #4: entri #4 mencantumkan `assets/css/kanade-palette.css` sebagai file yang dibuat, padahal tidak ada di commit tersebut. Daftar file di #4 tidak akurat; entri #4 tidak diubah sesuai aturan.

## #4 | add kanade theme
- Tanggal: tidak tercatat
- File: `_sass/minimal-mistakes/skins/_kanade.scss`, `assets/css/kanade-palette.css`, `_config.yml`
- Alasan: warna theme memakai palet Kanade (background `#121016`, teks `#EDEAF0`, aksen `#BB6588`)
- Catatan: skin diaktifkan lewat `minimal_mistakes_skin: "kanade"`. Warna hardcode dilarang, pakai variabel palet.

## #3 | add name and desc
- Tanggal: tidak tercatat
- File: `_config.yml`
- Alasan: menambah nama (nama panggung) dan description situs
- Catatan: description ditulis dalam English, kalimat belum final.

## #2 | fix feed
- Tanggal: tidak tercatat
- File: tidak tercatat (footer)
- Alasan: blog tidak dipakai, link Feed di footer dihapus

## #1 | fix ganti bahasa
- Tanggal: tidak tercatat
- File: `_layouts/default.html`
- Alasan: tombol "ganti bahasa" selalu berbahasa Inggris
- Catatan: `include_cached` untuk masthead diganti `include`, karena teksnya beda per bahasa.
