# DESIGN.md — Web Portofolio UI/UX Designer (Personal)

Dokumen ini adalah spesifikasi desain hasil slicing `index.html` (Tailwind CDN). Gunakan sebagai acuan tunggal untuk membangun ulang, mengubah, atau mengisi ulang web portofolio dengan **konten pribadi pemilik**.

> Cara pakai: bagian 1–9 menjelaskan desain (jangan diubah kecuali ingin redesign). Bagian 10 adalah **lembar konten** yang harus diisi dengan data diri Anda. Bagian 11 berisi catatan perbaikan dari hasil slicing.

---

## 1. Ringkasan

| Item | Nilai |
|---|---|
| Tipe | Landing page satu halaman (single page) portofolio |
| Gaya | Bersih, modern, banyak whitespace, aksen biru navy, sudut membulat besar |
| Stack | HTML5 + Tailwind CSS (CDN) + vanilla JS |
| Bahasa halaman | `lang="en"` (ubah ke `id` bila konten Bahasa Indonesia) |
| Scroll | `scroll-smooth` pada `<html>` |
| Section | Header → Hero → About Me → Services → Portfolio → Footer |
| Interaksi | Menu mobile (toggle), filter portofolio, hover card |

---

## 2. Design Tokens

### 2.1 Warna

**Brand (didefinisikan di `tailwind.config`)**

| Token | Hex | Pemakaian |
|---|---|---|
| `brand-navy` | `#1B2587` | Warna utama: heading hero, tombol utama, link aktif, filter aktif |
| `brand-blue` | `#2339B0` | Hover tombol utama, ikon layanan |
| `brand-accent` | `#3B57F0` | Aksen cadangan (belum dipakai di markup) |
| `brand-dark` | `#111827` | Teks gelap |
| `brand-subtle` | `#6B7280` | Teks sekunder |
| `brand-bgLight` | `#F8FAFC` | Background terang cadangan |
| `brand-cardDark` | `#2F333B` | Background kartu portofolio |
| `brand-progressRed` | `#C93B47` | Bar skill UX |
| `brand-progressOrange` | `#D97706` | Bar skill Website Design |
| `brand-progressGray` | `#4B5563` | Bar skill App Design |
| `brand-progressBlue` | `#1E2B8F` | Bar skill Graphic Design |

**Warna pendukung (utility Tailwind bawaan)**

| Kegunaan | Kelas / nilai |
|---|---|
| Background halaman | `bg-white` |
| Teks body | `text-gray-800`; paragraf `text-gray-500`; nav `text-gray-600` |
| Border halus | `border-gray-100`, `border-gray-200`, `border-gray-300` |
| Bintang rating | `text-amber-400` |
| Label kategori kartu | `text-amber-500` |
| Background section Services | `bg-gradient-to-b from-[#EFF3FC] to-[#DCE4F5]` |
| Ikon layanan (bg) | `bg-blue-100/70` (kartu biasa), `bg-blue-50` (kartu aktif) |
| Footer | `bg-gray-900`, teks `text-gray-400`, border `border-gray-800` |
| Pola dekoratif | cyan `text-cyan-500` (garis), `#93c5fd` (titik) |
| Logo gradient | `#EF4444` → `#F97316` → `#EF4444` |
| Ikon sosial | Facebook `bg-blue-600`, Telegram `bg-sky-500`, LinkedIn `bg-blue-700` |

**Selection teks**: `selection:bg-brand-navy selection:text-white`

### 2.2 Tipografi

- **Font utama**: `Plus Jakarta Sans` (400, 500, 600, 700, 800)
- **Fallback**: `Inter`, `system-ui`, `sans-serif`
- Sumber: Google Fonts (`preconnect` + `display=swap`)
- Body: `font-sans antialiased`

| Elemen | Kelas Tailwind |
|---|---|
| H1 Hero | `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]` (warna `brand-navy`) |
| Sapaan hero ("Hi I am") | `text-lg md:text-xl font-bold tracking-tight` |
| H2 section | `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight` (warna `gray-900`) |
| Deskripsi hero | `text-sm sm:text-base leading-relaxed text-gray-500` (maks `max-w-lg`) |
| Deskripsi section | `text-xs sm:text-sm leading-relaxed text-gray-500` |
| Judul kartu layanan | `text-base font-bold text-gray-900` |
| Teks kartu layanan | `text-xs leading-relaxed text-gray-600` |
| Nav link | `text-sm font-medium text-gray-600` (aktif: `font-semibold text-brand-navy`) |
| Tombol | `text-sm font-semibold` |
| Filter | `text-xs sm:text-sm font-medium` (aktif: `font-semibold`) |
| Label kartu portofolio | `text-[11px] font-semibold uppercase tracking-wider text-amber-500` |
| Judul kartu portofolio | `text-sm sm:text-base font-bold text-white leading-snug` |
| Label skill | `text-sm font-bold text-gray-900`; persen `text-xs text-gray-400` |

### 2.3 Spacing & Layout

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Padding vertikal section: `py-16 sm:py-24` (About), `py-20` (Services), `py-20 sm:py-24` (Portfolio)
- Hero: `pt-6 pb-20 lg:pt-12 lg:pb-32`
- Grid utama 12 kolom pada `lg`, gap `gap-12` (About: `lg:gap-16`)
- Tinggi header: `h-20`
- Gap kartu: `gap-6` (Services), `gap-8` (Portfolio)

### 2.4 Radius

| Pemakaian | Kelas |
|---|---|
| Tombol, pill, filter, ikon sosial | `rounded-full` |
| Foto hero & about, logo | `rounded-3xl` |
| Kartu layanan, badge | `rounded-2xl` |
| Ikon layanan, gambar kartu | `rounded-xl` |
| Fokus logo | `rounded-lg` |

### 2.5 Shadow (custom)

| Token | Nilai | Pemakaian |
|---|---|---|
| `shadow-card` | `0 12px 32px -4px rgba(27,37,135,.08), 0 4px 12px -2px rgba(0,0,0,.04)` | Kartu layanan, foto about |
| `shadow-float` | `0 20px 35px -5px rgba(0,0,0,.1), 0 10px 15px -5px rgba(0,0,0,.05)` | Badge melayang di hero |
| `shadow-btn` | `0 10px 20px -5px rgba(27,37,135,.3)` | Tombol utama |

### 2.6 Transisi & Efek

- Transisi umum: `transition-all duration-300`
- Hover kartu: `hover:-translate-y-1` (layanan), `hover:-translate-y-1.5` (portofolio)
- Hover gambar portofolio: `group-hover:scale-105 transition-transform duration-500`
- Tombol aktif: `active:scale-95`
- Header: `bg-white/95 backdrop-blur-md sticky top-0 z-50`
- Fokus: `focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy` (logo), `focus:ring-2 focus:ring-offset-2` (tombol)

### 2.7 Breakpoint (Tailwind default)

`sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280

---

## 3. Komponen

### 3.1 Tombol

| Varian | Kelas inti |
|---|---|
| **Primary** | `px-8 py-3 rounded-full bg-brand-navy text-white font-semibold text-sm shadow-btn hover:bg-brand-blue hover:shadow-lg active:scale-95` |
| **Secondary (outline)** | `px-8 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-semibold text-sm shadow-sm hover:border-brand-navy hover:text-brand-navy active:scale-95` |
| **CTA Navbar** | `px-6 py-2.5 rounded-full bg-brand-navy text-white text-sm font-semibold shadow-btn hover:bg-brand-blue` |

### 3.2 Filter Pill (Portfolio)

- Default: `px-5 py-2 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-gray-100 hover:text-brand-navy`
- Aktif: `bg-brand-navy text-white font-semibold shadow-sm`

### 3.3 Kartu Layanan

- Struktur: ikon (kotak 48×48, `rounded-xl`) → judul → deskripsi + link "Read more..."
- Kartu biasa: `bg-white/40 backdrop-blur-md border border-white/50`, hover jadi `bg-white` + `shadow-card`
- Kartu aktif/sorot (Web Design): `bg-white shadow-card border-white`
- Ikon: SVG outline, `stroke-width 1.8`, ukuran `w-7 h-7`

### 3.4 Kartu Portofolio

- Latar `brand-cardDark`, `rounded-2xl`, padding `p-3.5`, `shadow-lg`
- Gambar: rasio `aspect-[16/11]`, `rounded-xl`, `object-cover`
- Teks: label kategori amber (uppercase) + judul putih; hover judul → `text-blue-300`
- Atribut data: `data-category="uiux web app graphic"` (spasi sebagai pemisah, dipakai filter)

### 3.5 Skill Bar

- Track: `h-2 bg-gray-200 rounded-full`
- Fill: warna per skill, lebar dari inline `style="width: N%"`
- Thumb: lingkaran `w-4 h-4 bg-white border-4 [warna skill] rounded-full shadow-md` di ujung kanan fill

### 3.6 Badge Melayang (Hero)

1. **Review badge** (kiri atas): avatar kecil + 5 bintang + teks "20k+ Customer Review"
2. **Verified badge** (kiri tengah): lingkaran navy dengan ikon centang
3. **Social pill** (kanan bawah): 3 ikon sosial bulat di dalam pill putih

Semua: `bg-white/95 backdrop-blur-md shadow-float border border-gray-100`

---

## 4. Struktur Section

### 4.1 Header / Navbar
- Sticky, tinggi 80px, blur
- Kiri: logo SVG 40×40
- Tengah (desktop `md+`): Home, Services, Portfolio, About Us, Blog, Contact Us (`space-x-7 lg:space-x-9`)
- Kanan: tombol "Let's Talk"
- Mobile: tombol hamburger → dropdown vertikal berisi semua link + tombol "Let's Talk"

### 4.2 Hero (`#hero`)
- Grid 12 kolom: teks 6 kolom, gambar 6 kolom; di mobile tersusun vertikal & teks rata tengah
- Kiri: sapaan → H1 dua baris → deskripsi → 2 tombol (Contact Us, Portfolio)
- Kanan: dua lingkaran konsentris (border abu-abu) di belakang foto, foto `rounded-3xl` maks 340–420px, 3 badge melayang
- Dekorasi: garis diagonal cyan (kanan atas, `lg+`), titik-titik biru (kiri, `lg+`)

### 4.3 About Me (`#about`)
- Grid 12 kolom: foto 5 kolom, konten 7 kolom
- Foto rasio 4/5 `rounded-3xl`, dengan 3 lingkaran dekoratif di belakang (navy besar, slate kecil, biru transparan)
- Konten: H2 "About Me" → paragraf singkat → 4 skill bar (maks `max-w-xl`)

### 4.4 Services (`#services`)
- Background gradient biru muda vertikal
- Header tengah (maks `max-w-2xl`)
- Grid kartu: 1 kolom (mobile) → 2 kolom (`sm`) → 4 kolom (`lg`)
- 4 layanan: UI/UX Design, Web Design (aktif), App Design, Graphic Design

### 4.5 Portfolio (`#portfolio`)
- Header tengah + baris filter (All, UI/UX, Website Design, App Design, Graphic Design)
- Grid kartu: 1 kolom → 2 kolom (`md`) → 3 kolom (`lg`)
- Filter menyembunyikan/menampilkan kartu via kelas `hidden`

### 4.6 Footer (`#contact`)
- `bg-gray-900`, satu baris: copyright (kiri) + 3 link (kanan); mobile rata tengah

---

## 5. Perilaku & JavaScript

1. **Menu mobile**: tombol `#mobileMenuBtn` men-toggle kelas `hidden` pada `#mobileMenu`; menu tertutup otomatis saat salah satu link diklik.
2. **Filter portofolio**: klik tombol `.portfolio-filter-btn` →
   - reset semua tombol ke gaya default, beri gaya aktif pada tombol terpilih
   - baca `data-filter`; tampilkan kartu jika `all` atau `data-category` mengandung nilai tersebut, selain itu beri `hidden`
3. **Smooth scroll**: dari `scroll-smooth` + anchor `#hero #services #portfolio #about #blog #contact`

---

## 6. Aset

| Aset | Sumber saat ini | Catatan untuk versi pribadi |
|---|---|---|
| Foto hero | Unsplash (placeholder) | Ganti dengan **foto Anda** (rasio ±4:5, min 700px lebar) |
| Foto about | Unsplash (sama dengan hero) | Gunakan foto berbeda dari hero |
| Avatar review | Unsplash | Ganti foto klien/testimoni atau hapus badge |
| Gambar proyek ×3 | Unsplash | Ganti screenshot proyek nyata (rasio 16:11) |
| Logo | SVG inline | Ganti dengan logo/inisial pribadi |
| Ikon layanan, sosial | SVG inline | Bisa dipertahankan |
| Fallback gambar | `placehold.co` via `onerror` | Pertahankan sebagai pengaman |
| Font | Google Fonts | Pertahankan |

---

## 7. Responsif

| Area | Mobile (<640) | Tablet (`md`) | Desktop (`lg+`) |
|---|---|---|---|
| Navbar | Hamburger | Link muncul + tombol | Spasi nav lebih lebar |
| Hero | 1 kolom, teks tengah | 1 kolom | 2 kolom, teks kiri |
| Hero dekorasi | Disembunyikan | Disembunyikan | Tampil |
| About | 1 kolom | 1 kolom | 5 / 7 kolom |
| Services | 1 kolom | 2 kolom (`sm`) | 4 kolom |
| Portfolio | 1 kolom | 2 kolom | 3 kolom |
| Footer | Tengah, vertikal | Satu baris | Satu baris |

---

## 8. Aksesibilitas (kondisi saat ini)

Sudah ada: `alt` pada gambar, `aria-label` pada hamburger & ikon sosial, `lang`, fokus ring pada logo/tombol tertentu, HTML semantik (`header`, `nav`, `section`, `article`, `footer`).

Perlu diperhatikan: kontras teks `text-gray-400` pada putih dan label `text-amber-500` pada `#2F333B` perlu dicek; tambahkan `aria-expanded` pada hamburger; tambahkan `prefers-reduced-motion`.

---

## 9. Guideline Penggunaan Desain

- Warna aksi utama selalu `brand-navy`; jangan memperkenalkan warna aksen baru tanpa alasan.
- Semua tombol dan filter berbentuk **pill** (`rounded-full`).
- Heading section selalu `font-extrabold` dan rata tengah (kecuali About).
- Jaga rasio gambar: hero 4:5, about 4:5, proyek 16:11.
- Gunakan `shadow-card/float/btn` dari token, bukan shadow acak.
- Teks hero/section pendek: maksimal 2–3 kalimat per paragraf.

---

## 10. Lembar Konten Pribadi (ISI BAGIAN INI)

Ganti seluruh `[ ... ]` dengan data Anda. Jika ada yang tidak ingin ditampilkan, tulis `HAPUS` agar bagiannya dibuang dari halaman.

### 10.1 Identitas & SEO

| Field | Isi |
|---|---|
| Nama lengkap | `[Nama Anda]` |
| Peran / jabatan | `[mis. UI/UX Designer / Web Designer / Front-end Developer]` |
| `<title>` halaman | `[Nama Anda] — [Peran] Portfolio` |
| Meta description (≤160 karakter) | `[Ringkasan singkat siapa Anda dan apa yang Anda kerjakan]` |
| Bahasa konten | `[Indonesia / English]` |
| Kota (opsional) | `[Kota, Negara]` |

### 10.2 Navbar

| Field | Isi (default) |
|---|---|
| Teks tombol CTA | `[Let's Talk / Hubungi Saya]` |
| Menu | Home · Services · Portfolio · About · `[Blog — hapus jika belum ada]` · Contact |

### 10.3 Hero

| Field | Isi (default desain) | Isi Anda |
|---|---|---|
| Sapaan | "Hi I am" | `[Hi, saya]` |
| Judul (2 baris) | "UI & UX / Designer" | `[Nama Anda / atau Peran]` |
| Deskripsi (2–3 kalimat) | "With a passion for clean, intuitive…" | `[Deskripsikan nilai/keahlian Anda]` |
| Tombol 1 | Contact Us | `[Hubungi Saya]` |
| Tombol 2 | Portfolio | `[Lihat Karya]` |
| Foto | Placeholder | `[path/foto-anda.jpg]` |
| Badge review | "20k+ Customer Review" | `[Isi dengan angka NYATA, mis. "12 Proyek Selesai" — jangan memakai angka palsu]` |

### 10.4 About Me

| Field | Isi Anda |
|---|---|
| Paragraf tentang saya (2–4 kalimat) | `[Cerita singkat, pengalaman, pendekatan kerja]` |
| Foto | `[path/foto-about.jpg]` |

**Skill bar (maksimal 4–5, nilai jujur)**

| Skill | Persen | Warna bar |
|---|---|---|
| `[UX / Research]` | `[..]%` | `brand-progressRed` |
| `[Website Design]` | `[..]%` | `brand-progressOrange` |
| `[App Design]` | `[..]%` | `brand-progressGray` |
| `[Graphic Design]` | `[..]%` | `brand-progressBlue` |

### 10.5 Services (4 kartu)

| # | Judul | Deskripsi (1–2 kalimat) | Link "Read more" |
|---|---|---|---|
| 1 | `[UI/UX Design]` | `[..]` | `[#/URL]` |
| 2 | `[Web Design]` (kartu sorot) | `[..]` | `[#/URL]` |
| 3 | `[App Design]` | `[..]` | `[#/URL]` |
| 4 | `[Graphic Design]` | `[..]` | `[#/URL]` |

Teks pengantar section: `[1–2 kalimat tentang cara Anda bekerja]`

### 10.6 Portfolio (minimal 3 proyek)

Teks pengantar section: `[1–2 kalimat]`

| # | Judul proyek | Label kartu | Kategori (`uiux` `web` `app` `graphic`) | Gambar | Link studi kasus |
|---|---|---|---|---|---|
| 1 | `[..]` | `[Design]` | `[..]` | `[path]` | `[URL]` |
| 2 | `[..]` | `[Design]` | `[..]` | `[path]` | `[URL]` |
| 3 | `[..]` | `[Design]` | `[..]` | `[path]` | `[URL]` |

### 10.7 Kontak & Sosial Media

| Field | Isi Anda |
|---|---|
| Email | `[email@domain.com]` |
| WhatsApp / Telepon (opsional) | `[+62…]` |
| LinkedIn | `[URL]` |
| Instagram / Behance / Dribbble / GitHub | `[URL]` |
| Ikon sosial yang ditampilkan di hero | `[pilih 3: mis. LinkedIn, Instagram, Behance]` (ganti ikon Facebook/Telegram bila perlu) |

### 10.8 Footer

| Field | Isi |
|---|---|
| Copyright | `© [Tahun] [Nama Anda]. All rights reserved.` |
| Link 1–3 | `[Privacy Policy / Terms / Support]` atau ganti dengan link sosial; **hapus bila halamannya belum ada** |

---

## 11. Catatan Perbaikan dari Hasil Slicing

Hal berikut ditemukan di `index.html` dan sebaiknya diperbaiki saat membuat versi pribadi:

1. **Link `#blog` tidak punya section.** Hapus menu Blog atau buat section-nya.
2. **Filter awal tidak sinkron.** Tombol "UI/UX" tampil aktif, tetapi ketiga kartu terlihat semua. Jadikan "All" aktif di awal, atau jalankan filter `uiux` saat halaman dimuat.
3. **Kelas `animate-fade-in` tidak terdefinisi** di Tailwind config. Tambahkan keyframes atau hapus kelasnya.
4. **`.pattern-lines` dan `brand-accent`/`brand-dark`/`brand-subtle`/`brand-bgLight` tidak dipakai.** Hapus atau manfaatkan.
5. **Foto hero dan about sama.** Pakai dua foto berbeda.
6. **Teks layanan identik di keempat kartu.** Tulis deskripsi unik.
7. **Kartu portofolio tidak bisa diklik.** Bungkus dengan `<a>` ke studi kasus atau modal.
8. **Link footer semua mengarah ke `#hero`.** Arahkan ke halaman nyata atau hapus.
9. **Tailwind via CDN** hanya cocok untuk prototipe. Untuk produksi, build Tailwind (CLI/PostCSS) agar lebih cepat dan kecil.
10. **Section kontak belum ada.** `#contact` hanya footer; pertimbangkan form kontak atau blok email/WhatsApp.
11. **Badge "20k+ Customer Review" adalah angka contoh.** Ganti dengan fakta Anda sendiri.
12. **Aksesibilitas**: tambah `aria-expanded` pada hamburger, `aria-selected`/`role="tab"` yang konsisten pada filter, dan `prefers-reduced-motion`.
13. **Filter animasi**: opacity diatur bersamaan dengan `hidden` sehingga transisi tidak terlihat; gunakan pendekatan fade yang benar bila diinginkan.

---

## 12. Checklist Sebelum Publish

- [ ] Semua `[ ... ]` di bagian 10 terisi atau dihapus
- [ ] Semua foto dan gambar proyek diganti dengan milik sendiri (hak pakai jelas)
- [ ] Title, meta description, dan Open Graph terisi
- [ ] Menu dan anchor tidak ada yang mengarah ke section kosong
- [ ] Diuji di 360 / 768 / 1024 / 1440 px
- [ ] Kontras teks dan fokus keyboard dicek
- [ ] Tidak ada klaim/angka palsu (review, jumlah klien, persentase skill)
- [ ] Tailwind di-build untuk produksi (opsional tapi disarankan)
