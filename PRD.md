# PRD — Web Portofolio Pribadi dengan Admin CMS

| Item | Nilai |
|---|---|
| Nama produk | Personal Portfolio (UI/UX Designer) |
| Versi dokumen | 1.0 |
| Tanggal | 23 Oktober 2026 |
| Pemilik | `[Firman Dwi Nugraha]` |
| Referensi desain | `DESIGN.md` (hasil slicing `index.html`) |
| Stack | Next.js (App Router) · Supabase (Postgres, Auth, Storage) · Vercel · Tailwind CSS |

---

## 1. Latar Belakang & Tujuan

Desain portofolio sudah tersedia dalam bentuk HTML statis (Tailwind CDN) dengan konten contoh. Konten masih ditulis langsung di kode, sehingga setiap perubahan teks, foto, atau proyek menuntut edit kode dan deploy ulang.

**Tujuan produk**

1. Menampilkan portofolio pribadi yang cepat, rapi, dan SEO-friendly sesuai `DESIGN.md`.
2. Semua konten halaman publik dapat **diubah lewat halaman admin** tanpa menyentuh kode.
3. Di-deploy di Vercel dengan data dan file tersimpan di Supabase.
4. Menerima pesan dari pengunjung (form kontak) dan menampilkannya di admin.

**Metrik keberhasilan**

| Metrik | Target |
|---|---|
| Lighthouse (mobile) Performance / Accessibility / SEO | ≥ 90 / ≥ 95 / ≥ 95 |
| LCP halaman publik | ≤ 2,5 detik |
| Waktu dari "Simpan" di admin sampai tampil di publik | ≤ 10 detik |
| Perubahan konten tanpa edit kode | 100% bagian yang ada di `DESIGN.md` bagian 10 |
| Pesan kontak yang tersimpan tanpa error | ≥ 99% |

---

## 2. Pengguna

| Persona | Deskripsi | Kebutuhan utama |
|---|---|---|
| **Pengunjung** (calon klien, recruiter) | Membuka web dari HP atau laptop | Memahami siapa pemilik, melihat karya, menghubungi dengan mudah |
| **Admin / Pemilik** | Satu orang (pemilik web) | Mengubah konten, menambah proyek, melihat pesan masuk, tanpa coding |

> Sistem dirancang **single-admin**. Multi-user/role di luar cakupan v1.

---

## 3. Ruang Lingkup

### 3.1 Dalam cakupan (In Scope) v1

- Halaman publik satu halaman: Header, Hero, About, Services, Portfolio (+ filter), Contact, Footer
- Halaman detail proyek (`/projects/[slug]`)
- Admin panel terproteksi untuk mengelola semua konten
- Upload dan pengelolaan gambar (Supabase Storage)
- Form kontak + inbox pesan di admin
- Pengaturan SEO dasar dan Open Graph
- Responsif sesuai `DESIGN.md`
- Analitik dasar (Vercel Analytics)

### 3.2 Di luar cakupan (Out of Scope) v1

- Blog penuh (menu Blog disembunyikan sampai fitur dibuat; lihat Fase 2)
- Multi-admin, role, dan permission
- Multi-bahasa (i18n)
- Komentar, login pengunjung, e-commerce
- Pengiriman email otomatis (opsional Fase 2)
- Editor visual drag-and-drop (admin berbasis form)

---

## 4. Arsitektur Teknis

### 4.1 Gambaran

```
Pengunjung ──► Vercel (Next.js App Router, Server Components + ISR)
                    │
                    ├── Supabase Postgres  (konten, pesan, pengaturan)
                    ├── Supabase Storage   (gambar, bucket publik)
                    └── Supabase Auth      (login admin)

Admin ──► /admin (Server Actions) ──► Supabase ──► revalidate cache Next.js
```

### 4.2 Keputusan Teknis

| Area | Keputusan | Alasan |
|---|---|---|
| Framework | Next.js App Router + TypeScript | SSR/ISR, SEO, Server Actions untuk admin |
| Styling | Tailwind CSS (di-build, **bukan CDN**) + token dari `DESIGN.md` | Performa produksi |
| Font | `next/font` (Plus Jakarta Sans) | Tanpa layout shift, self-hosted |
| Gambar | `next/image` + Supabase Storage | Optimasi otomatis, lazy load |
| Data publik | Dibaca di Server Component, cache dengan tag; invalidasi via `revalidateTag` / `revalidatePath` saat admin menyimpan | Cepat dan tetap segar |
| Auth | Supabase Auth (email + password), paket `@supabase/ssr` | Session berbasis cookie |
| Otorisasi | Tabel `admins` + Row Level Security (RLS) + pengecekan di middleware | Pertahanan berlapis |
| Mutasi admin | Server Actions + validasi `zod` | Aman, tanpa API publik tambahan |
| Deploy | Vercel (Preview per branch, Production dari `main`) | Alur CI/CD bawaan |
| Analitik | Vercel Analytics + Speed Insights | Ringan |

### 4.3 Struktur Rute

| Rute | Tipe | Keterangan |
|---|---|---|
| `/` | Publik | Landing: semua section |
| `/projects/[slug]` | Publik | Detail studi kasus |
| `/admin/login` | Publik | Form login admin |
| `/admin` | Terproteksi | Dashboard ringkasan |
| `/admin/hero` | Terproteksi | Edit Hero |
| `/admin/about` | Terproteksi | Edit About + skill |
| `/admin/services` | Terproteksi | CRUD layanan |
| `/admin/projects` | Terproteksi | CRUD proyek (+ `/new`, `/[id]`) |
| `/admin/messages` | Terproteksi | Inbox pesan kontak |
| `/admin/settings` | Terproteksi | Navbar, footer, sosial media, SEO, ganti password |
| `/api/contact` | API (publik) | Terima form kontak (rate limit) |
| `sitemap.xml`, `robots.txt` | Otomatis | SEO |

---

## 5. Kebutuhan Fungsional

Prioritas: **P0** = wajib v1, **P1** = penting, **P2** = nanti.

### 5.1 Halaman Publik

| ID | Kebutuhan | Prioritas |
|---|---|---|
| PUB-01 | Header sticky dengan logo, nav, tombol CTA, menu hamburger di mobile (sesuai `DESIGN.md` 4.1) | P0 |
| PUB-02 | Hero: sapaan, judul, deskripsi, 2 tombol, foto, badge, ikon sosial; semua teks dan gambar dari database | P0 |
| PUB-03 | About: foto, paragraf, skill bar (jumlah dan warna dinamis, lebar sesuai persen) | P0 |
| PUB-04 | Services: kartu dinamis dengan ikon, judul, deskripsi, link; satu kartu bisa ditandai "sorot" | P0 |
| PUB-05 | Portfolio: grid kartu, filter kategori (default **All**), hanya proyek berstatus *published* | P0 |
| PUB-06 | Kartu proyek dapat diklik menuju `/projects/[slug]` | P0 |
| PUB-07 | Detail proyek: judul, kategori, deskripsi, galeri gambar, tautan eksternal opsional | P0 |
| PUB-08 | Section Contact: form (nama, email, pesan) + info kontak | P0 |
| PUB-09 | Footer: copyright dan link dinamis | P0 |
| PUB-10 | Section dapat disembunyikan/ditampilkan dari admin (mis. badge review, Blog) | P1 |
| PUB-11 | Animasi hormat `prefers-reduced-motion` | P1 |
| PUB-12 | Halaman 404 dan error bergaya sesuai desain | P1 |
| PUB-13 | Blog (daftar + detail) | P2 |

### 5.2 Admin

| ID | Kebutuhan | Prioritas |
|---|---|---|
| ADM-01 | Login email/password; sesi dengan cookie; logout | P0 |
| ADM-02 | Semua rute `/admin/*` terproteksi (middleware + cek tabel `admins`); non-admin ditolak | P0 |
| ADM-03 | Edit Hero (semua field di `DESIGN.md` 10.3) | P0 |
| ADM-04 | Edit About + CRUD skill (nama, persen 0–100, warna, urutan) | P0 |
| ADM-05 | CRUD Services (judul, deskripsi, ikon, link, sorot, urutan, tampil/sembunyi) | P0 |
| ADM-06 | CRUD Projects (judul, slug otomatis, label, kategori multi, gambar sampul, galeri, deskripsi, link, status draft/published, urutan) | P0 |
| ADM-07 | Upload gambar ke Storage dengan validasi tipe/ukuran, preview, ganti, dan hapus | P0 |
| ADM-08 | Settings: judul situs, navbar, teks CTA, sosial media, footer, email/WA kontak | P0 |
| ADM-09 | Settings SEO: meta title, description, gambar Open Graph | P0 |
| ADM-10 | Inbox pesan: daftar, buka detail, tandai dibaca, hapus | P0 |
| ADM-11 | Setelah simpan, halaman publik terkait ter-revalidate otomatis | P0 |
| ADM-12 | Notifikasi sukses/gagal dan validasi form (pesan error jelas) | P0 |
| ADM-13 | Atur urutan dengan drag-and-drop (Services, Projects, Skills) | P1 |
| ADM-14 | Tombol "Lihat situs" dan pratinjau draft proyek | P1 |
| ADM-15 | Ganti password dari admin | P1 |
| ADM-16 | Dashboard ringkasan (jumlah proyek, pesan belum dibaca) | P1 |
| ADM-17 | Ekspor pesan (CSV) | P2 |
| ADM-18 | Riwayat perubahan / audit log | P2 |

### 5.3 Form Kontak

| ID | Kebutuhan | Prioritas |
|---|---|---|
| CON-01 | Validasi sisi klien dan server (nama, email valid, pesan min. 10 karakter) | P0 |
| CON-02 | Anti-spam: honeypot field + rate limit per IP | P0 |
| CON-03 | Simpan ke tabel `messages`; tampilkan pesan sukses/gagal | P0 |
| CON-04 | Notifikasi email ke admin saat pesan baru (mis. via Resend) | P2 |
| CON-05 | CAPTCHA (Turnstile/hCaptcha) bila spam tinggi | P2 |

---

## 6. Model Data (Supabase Postgres)

Semua tabel di skema `public`, RLS **aktif**.

```sql
-- Fungsi bantu: cek apakah user login adalah admin
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Pengaturan situs (satu baris)
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  site_title text not null,
  meta_description text,
  og_image_url text,
  logo_url text,
  language text not null default 'id',
  nav_items jsonb not null default '[]',      -- [{label, href, visible}]
  cta_label text,
  cta_href text,
  contact_email text,
  contact_phone text,
  social_links jsonb not null default '[]',   -- [{platform, url, show_in_hero}]
  footer_copyright text,
  footer_links jsonb not null default '[]',   -- [{label, href}]
  updated_at timestamptz not null default now()
);

-- Hero (satu baris)
create table public.hero (
  id int primary key default 1 check (id = 1),
  greeting text,
  title text not null,
  description text,
  primary_btn_label text, primary_btn_href text,
  secondary_btn_label text, secondary_btn_href text,
  image_url text,
  badge_visible boolean not null default false,
  badge_text text,
  badge_avatar_url text,
  updated_at timestamptz not null default now()
);

-- About (satu baris)
create table public.about (
  id int primary key default 1 check (id = 1),
  heading text not null default 'About Me',
  body text,
  image_url text,
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  percent int not null check (percent between 0 and 100),
  color text not null default '#1B2587',
  sort_order int not null default 0
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,                       -- nama ikon dari set ikon yang disediakan
  link_url text,
  is_highlighted boolean not null default false,
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  label text default 'Design',
  categories text[] not null default '{}',   -- uiux, web, app, graphic
  cover_url text,
  gallery_urls text[] not null default '{}',
  summary text,
  content text,                              -- deskripsi studi kasus (markdown)
  external_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  body text not null,
  is_read boolean not null default false,
  ip_hash text,
  created_at timestamptz not null default now()
);
```

### 6.1 Kebijakan RLS

| Tabel | Pengunjung (anon) | Admin |
|---|---|---|
| `site_settings`, `hero`, `about`, `skills` | `select` | `select`, `insert`, `update`, `delete` |
| `services` | `select` hanya `is_visible = true` | Penuh |
| `projects` | `select` hanya `status = 'published'` | Penuh |
| `messages` | **Tanpa** akses langsung (insert lewat `/api/contact` dengan service role atau fungsi aman) | `select`, `update`, `delete` |
| `admins` | Tanpa akses | `select` |

Aturan: semua kebijakan tulis memakai `using / with check (public.is_admin())`.

### 6.2 Storage

| Bucket | Akses | Isi |
|---|---|---|
| `site-media` | Baca publik, tulis hanya admin (policy `is_admin()`) | Foto hero/about, logo, sampul dan galeri proyek |

Batas upload: JPG/PNG/WebP/AVIF, maks. 5 MB per file. Nama file di-*randomize* (UUID).

---

## 7. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
|---|---|
| **Performa** | Halaman publik di-cache (ISR/tag); gambar via `next/image` dengan `sizes` benar; font self-hosted; LCP ≤ 2,5 dtk |
| **SEO** | Metadata dinamis (`generateMetadata`), Open Graph, `sitemap.xml`, `robots.txt`, heading semantik, JSON-LD `Person` |
| **Keamanan** | RLS pada semua tabel; service role key hanya di server; cookie `httpOnly`/`secure`; validasi `zod` di server; sanitasi markdown; header keamanan (CSP, X-Frame-Options); rate limit form kontak; admin tidak diindeks (`noindex`) |
| **Aksesibilitas** | WCAG 2.1 AA: kontras, fokus keyboard terlihat, `alt` wajib diisi di admin untuk gambar konten, `aria-expanded` pada menu, `prefers-reduced-motion` |
| **Responsif** | Breakpoint dan perilaku sesuai `DESIGN.md` bagian 7 |
| **Ketersediaan** | Mengandalkan SLA Vercel dan Supabase; halaman publik tetap tampil dari cache bila database sementara tidak tersedia |
| **Pemeliharaan** | TypeScript strict, ESLint + Prettier, komponen reusable, tipe database di-generate dari Supabase |
| **Privasi** | Hanya simpan data yang perlu (nama, email, pesan); IP disimpan sebagai hash; tampilkan informasi penggunaan data di dekat form |
| **Backup** | Gunakan backup Supabase; ekspor data konten berkala (manual atau terjadwal) |

---

## 8. Alur Pengguna Utama

**A. Admin mengubah konten**
1. Buka `/admin/login` → masuk dengan email dan password.
2. Pilih menu (mis. Projects) → ubah atau tambah data → upload gambar.
3. Klik Simpan → validasi → data tersimpan → cache publik di-revalidate → muncul toast sukses.
4. Klik "Lihat situs" untuk memeriksa hasilnya.

**B. Pengunjung menghubungi pemilik**
1. Scroll ke Contact → isi nama, email, pesan → kirim.
2. Server memvalidasi, memeriksa honeypot dan rate limit → simpan ke `messages`.
3. Pengunjung melihat pesan sukses; admin melihat pesan baru (belum dibaca) di inbox.

**C. Pengunjung melihat proyek**
1. Di Portfolio, pilih filter kategori → kartu terfilter.
2. Klik kartu → `/projects/[slug]` → baca detail dan galeri → kembali atau hubungi.

---

## 9. Kriteria Penerimaan (Acceptance Criteria)

| ID | Kriteria |
|---|---|
| AC-01 | Tampilan publik cocok dengan `DESIGN.md` (token, komponen, responsif) pada 360 / 768 / 1024 / 1440 px |
| AC-02 | Mengubah teks Hero di admin lalu menyimpan menampilkan perubahan di `/` dalam ≤ 10 detik tanpa deploy ulang |
| AC-03 | Proyek berstatus *draft* tidak tampil di publik dan tidak bisa diakses via URL `/projects/[slug]` |
| AC-04 | Akses `/admin/*` tanpa login diarahkan ke `/admin/login`; user login yang bukan admin ditolak |
| AC-05 | Pengunjung anon tidak dapat membaca tabel `messages` atau menulis ke tabel mana pun melalui API Supabase |
| AC-06 | Upload file non-gambar atau > 5 MB ditolak dengan pesan jelas |
| AC-07 | Filter portofolio default "All"; filter bekerja untuk semua kategori; tidak ada kartu "tersembunyi" yang tetap bisa diklik |
| AC-08 | Form kontak: input tidak valid menampilkan error; input valid tersimpan dan muncul di inbox admin |
| AC-09 | Menu Blog tidak muncul selama fitur Blog belum ada |
| AC-10 | Tidak ada link yang mengarah ke anchor/halaman kosong |
| AC-11 | Lighthouse mobile pada Production memenuhi target di bagian 1 |
| AC-12 | Seluruh gambar konten punya `alt`; navigasi keyboard berfungsi di menu dan filter |

---

## 10. Konfigurasi & Deployment

### 10.1 Environment Variables

| Variabel | Lokasi | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server | URL proyek Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server | Anon key (dibatasi RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server saja** | Jangan pernah diekspos ke client |
| `NEXT_PUBLIC_SITE_URL` | Client + server | Domain produksi (untuk sitemap, OG) |
| `REVALIDATE_SECRET` | Server | Opsional, untuk endpoint revalidate manual |

### 10.2 Lingkungan

| Lingkungan | Sumber | Database |
|---|---|---|
| Local | `next dev` | Supabase proyek dev (atau Supabase CLI lokal) |
| Preview | Setiap branch/PR di Vercel | Proyek Supabase staging/dev |
| Production | Branch `main` | Proyek Supabase production |

### 10.3 Langkah Setup Awal

1. Buat proyek Supabase → jalankan migrasi SQL (bagian 6) → aktifkan RLS dan buat policy.
2. Buat bucket `site-media` dan policy Storage.
3. Buat user admin di Supabase Auth → masukkan `user_id` ke tabel `admins`.
4. *Seed* data awal dari `DESIGN.md` bagian 10 (hero, about, skills, services, 3 proyek, settings).
5. Hubungkan repo ke Vercel → isi environment variables → deploy.
6. Hubungkan domain kustom; aktifkan Vercel Analytics.

---

## 11. Rencana Rilis

| Fase | Cakupan | Perkiraan |
|---|---|---|
| **0 — Fondasi** | Setup Next.js + Tailwind + token desain, Supabase project, skema, RLS, storage, deploy Vercel kosong | 2–3 hari |
| **1 — Publik** | Slicing semua section ke komponen Next.js, baca data dari Supabase, halaman detail proyek, SEO dasar | 4–6 hari |
| **2 — Admin inti** | Auth, middleware, CRUD Hero/About/Skills/Services/Projects, upload gambar, revalidate | 5–7 hari |
| **3 — Kontak & Settings** | Form kontak + anti-spam, inbox admin, Settings (navbar, footer, sosial, SEO) | 2–3 hari |
| **4 — Polesan & QA** | Aksesibilitas, performa, 404/error, uji responsif, kriteria penerimaan, isi konten asli, go-live | 3–4 hari |
| **5 — Lanjutan (opsional)** | Blog, notifikasi email, drag-and-drop urutan, ekspor CSV, audit log | Sesuai kebutuhan |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Kebocoran `service_role` key | Seluruh data terbuka | Simpan hanya di env server Vercel, jangan prefix `NEXT_PUBLIC`, rotasi bila dicurigai |
| RLS salah konfigurasi | Data pesan atau draft bocor | Uji policy dengan akun anon; masukkan ke kriteria penerimaan AC-05 |
| Spam form kontak | Inbox penuh | Honeypot + rate limit; naikkan ke CAPTCHA bila perlu |
| Gambar besar memperlambat web | LCP buruk | Batas upload 5 MB, `next/image`, format WebP/AVIF |
| Cache publik tidak ter-update | Konten lama tampil | Revalidate per tag setelah tiap mutasi; endpoint revalidate manual |
| Proyek Supabase free tier *pause* karena tidak aktif | Situs tidak memuat data baru | Pantau aktivitas, pertimbangkan paket berbayar untuk produksi |
| Konten contoh/klaim palsu ikut tayang | Merusak kredibilitas | Gunakan hanya data nyata; badge review default disembunyikan |

---

## 13. Pertanyaan Terbuka

1. Domain apa yang akan dipakai (`.com`, `.id`, atau subdomain Vercel dulu)?
2. Bahasa konten: Indonesia, Inggris, atau perlu dua bahasa nanti?
3. Apakah Blog dibutuhkan di rilis pertama atau Fase 5?
4. Apakah pesan kontak perlu dikirim juga ke email/WhatsApp, atau cukup inbox admin?
5. Apakah ingin 2FA untuk akun admin?
6. Set ikon layanan: tetap 4 ikon bawaan atau pilihan lebih banyak di admin?
7. Apakah halaman detail proyek cukup teks + galeri, atau butuh format studi kasus terstruktur (masalah, proses, hasil)?

---

## 14. Lampiran

- **Desain & token:** `DESIGN.md`
- **Konten awal (seed):** `DESIGN.md` bagian 10
- **Catatan perbaikan dari slicing:** `DESIGN.md` bagian 11 (semuanya sudah dicakup di PRD ini: filter default All, menu Blog, link mati, kartu proyek bisa diklik, Tailwind di-build, aksesibilitas)
