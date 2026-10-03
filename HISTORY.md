# History Perubahan

Log perubahan web portofolio yang dikerjakan lewat Antigravity.

Aturan:
- Terbaru di atas. Satu entri = satu tugas/sesi.
- Format: nomor, judul singkat, tanggal, file, alasan.
- Jangan ubah entri lama. Kalau ada koreksi, tulis entri baru.
- Yang tidak diketahui ditulis "tidak tercatat", jangan menebak.

---

## #12 | siapkan verifikasi domain Discord lewat HTTPS
- Tanggal: 2026-10-03
- File: `CATATAN.md`, `HISTORY.md`, `_config.yml`, `.well-known/discord`
- Alasan: menyiapkan verifikasi domain Discord lewat HTTPS dengan membuat file `.well-known/discord` berisi satu baris kode verifikasi `dh=11a13d75cc51e5695ff63a9f2cb6af048da6da90` tanpa baris kosong tambahan, menambahkan `.well-known` ke daftar `include:` di `_config.yml` agar tidak diabaikan Jekyll, dan menambahkan catatan di bagian Gotcha pada `CATATAN.md` mengenai verifikasi Discord dan larangan membuat file `.nojekyll`.

## #11 | perbarui acuan slug URL di CATATAN.md
- Tanggal: 2026-10-03
- File: `CATATAN.md`, `HISTORY.md`
- Alasan: memperbarui baris usang di bagian "Aturan mapping" pada CATATAN.md yang sebelumnya menyatakan bahwa slug URL tiap sub-halaman belum ditentukan, menjadi menunjuk ke bagian "Slug URL" sebagai sumber yang berlaku. Bagian lain tidak diubah.

## #10 | tombol link HOME ke semua sub-halaman (id, en, ja)
- Tanggal: 2026-10-03
- File: `CATATAN.md`, `HISTORY.md`, `_includes/head/custom.html`, `_pages/en-main.md`, `_pages/id-main.md`, `_pages/ja-main.md`
- Alasan: menghubungkan HOME ke halaman di mapping. Motto 3E sekarang ke `/{lang}/3e/` (tooltip dan efek hover tidak diubah). Isi dua `<details markdown="1">` diganti daftar HTML berisi tombol link (`ul.home-links` > `a.home-btn`, tanpa JavaScript): 3 Main Portfolio + 9 Additional Portfolio, ditambah tombol About dan Contact di bawahnya (tugas opsional). Teks tombol mengikuti bahasa halaman (en "Japanese Language" jadi "Japanese", ja "人事（HR）" jadi "HR", sesuai permintaan). Urutan dan jumlah tombol sama di tiga bahasa (15 href per halaman termasuk 3E). CSS tombol hanya memakai `--kanade-bg`, `--kanade-text`, `--kanade-accent`; hover dibatasi `@media (hover: hover)`, ada `:active` untuk layar sentuh, `:focus-visible` dengan outline, tinggi minimum 2.75rem. Dua komentar lama ("href sementara" dan "Link sub-halaman dikosongkan") dihapus karena sudah tidak berlaku. Status fitur ditambah satu baris. Salam pembuka dan [TEKS DARI MIZO] tidak diubah.
- Catatan: dicek manual. Semua 45 href cocok dengan permalink di `_pages/`, tidak ada link ke halaman yang belum ada. Render belum diverifikasi lokal (Jekyll tidak terpasang).

## #9 | kerangka 15 sub-halaman (id, en, ja)
- Tanggal: 2026-10-03
- File: `CATATAN.md`, `HISTORY.md`,
  `_pages/en-3e.md`, `_pages/en-about.md`, `_pages/en-contact.md`, `_pages/en-portfolio-coding.md`, `_pages/en-portfolio-cooking.md`, `_pages/en-portfolio-data-analysis.md`, `_pages/en-portfolio-design.md`, `_pages/en-portfolio-hr.md`, `_pages/en-portfolio-illustration.md`, `_pages/en-portfolio-japanese.md`, `_pages/en-portfolio-music.md`, `_pages/en-portfolio-psychology.md`, `_pages/en-portfolio-second-brain.md`, `_pages/en-portfolio-sport.md`, `_pages/en-portfolio-writing.md`,
  `_pages/id-3e.md`, `_pages/id-about.md`, `_pages/id-contact.md`, `_pages/id-portfolio-coding.md`, `_pages/id-portfolio-cooking.md`, `_pages/id-portfolio-data-analysis.md`, `_pages/id-portfolio-design.md`, `_pages/id-portfolio-hr.md`, `_pages/id-portfolio-illustration.md`, `_pages/id-portfolio-japanese.md`, `_pages/id-portfolio-music.md`, `_pages/id-portfolio-psychology.md`, `_pages/id-portfolio-second-brain.md`, `_pages/id-portfolio-sport.md`, `_pages/id-portfolio-writing.md`,
  `_pages/ja-3e.md`, `_pages/ja-about.md`, `_pages/ja-contact.md`, `_pages/ja-portfolio-coding.md`, `_pages/ja-portfolio-cooking.md`, `_pages/ja-portfolio-data-analysis.md`, `_pages/ja-portfolio-design.md`, `_pages/ja-portfolio-hr.md`, `_pages/ja-portfolio-illustration.md`, `_pages/ja-portfolio-japanese.md`, `_pages/ja-portfolio-music.md`, `_pages/ja-portfolio-psychology.md`, `_pages/ja-portfolio-second-brain.md`, `_pages/ja-portfolio-sport.md`, `_pages/ja-portfolio-writing.md`
- Alasan: merealisasikan kerangka "Mapping web": 15 halaman (3E, About, Contact, 3 Main Portfolio, 9 Additional Portfolio) x 3 bahasa = 45 file. Front matter meniru halaman main (`layout: single`, `lang`, `change_lang_text`), permalink sesuai slug baru, title dalam bahasa halaman; body hanya `[TEKS DARI MIZO]`. Slug dicatat di bagian baru "Slug URL" di CATATAN.md, Status fitur ditandai [/]. HOME, easter egg, dan halaman pilih bahasa tidak disentuh; belum ada link dari HOME.
- Catatan: Jekyll tidak terpasang, dicek manual (45 file baru, tidak ada permalink ganda, front matter valid, UTF-8 tanpa BOM). Tombol ganti bahasa belum membawa ke halaman setara (selalu ke `/?pilih` lalu ke `/{lang}/main/`); dilaporkan ke pemilik, tidak diperbaiki.

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
