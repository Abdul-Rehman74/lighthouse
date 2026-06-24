# Lighthouse Daycare & Montessori

Bright, playful, photo-led marketing site for Lighthouse Daycare — built with Next.js 14, TypeScript and Tailwind CSS, organized using **atomic design**.

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm start
```

## Pages

- `/`         — Home (hero, promise panel, three pillars, scrapbook, trial CTA, packages peek)
- `/about`    — Story, 22-teacher staff grid, daily routine, values, FAQ
- `/gallery`  — Filterable photo grid + video testimonials
- `/packages` — 3 plans, comparison table, what's included, FAQ
- `/contact`  — Booking form (server action), branches, map, social
- `/admin`    — **Admin panel** (password-protected): dashboard, trial submissions, gallery, testimonials, settings

> Public pages live in the `(marketing)` route group so the admin panel renders
> without the site nav/footer. URLs are unchanged.

## Admin panel & backend

The admin panel is a real, database-backed app (not a static mockup):

- **Database** — MongoDB (collections: `submissions`, `photos`, `testimonials`, `settings`).
  Trial bookings from the public form are saved here and appear live in the admin.
- **Auth** — single admin password. The first login is seeded from `ADMIN_PASSWORD`;
  thereafter the password is stored **hashed** (bcrypt) in the DB and changed from
  the Settings page. Sessions are an HMAC-signed httpOnly cookie; `/admin/*` is
  guarded by `src/middleware.ts`.
- **Email** — booking notifications are sent over SMTP via Nodemailer (optional; if
  SMTP env vars are absent, bookings still save and email is skipped).
- **Gallery images** — uploaded photos are stored as base64 data URLs in MongoDB
  (max 2 MB each). For a large/high-traffic gallery, switch to a blob store
  (Vercel Blob / Cloudinary / S3) and store URLs instead — only `addPhoto` in
  `src/lib/admin-data.ts` and the upload handler need to change.

### Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Var | Purpose |
|-----|---------|
| `MONGODB_URI`, `MONGODB_DB` | MongoDB Atlas connection |
| `AUTH_SECRET` | random string signing the admin session cookie (`openssl rand -base64 32`) |
| `ADMIN_PASSWORD` | seeds the first admin login only |
| `SMTP_HOST` / `PORT` / `SECURE` / `USER` / `PASS` | SMTP server for notifications |
| `MAIL_FROM`, `MAIL_TO` | sender + daycare inbox for booking alerts |

## Deploying to Vercel

1. **Database**: create a free **MongoDB Atlas M0** cluster, add a DB user, and
   allow network access from `0.0.0.0/0` (Vercel's IPs are dynamic). Copy the SRV URI.
   > MongoDB **cannot** be hosted on Vercel itself (no persistent processes) — Atlas
   > (or another managed DB) is required. The Mongo client is cached on `globalThis`
   > (`src/lib/db.ts`) so serverless invocations reuse connections.
2. **Push** this repo to GitHub and import it in Vercel.
3. **Add all env vars** under Project → Settings → Environment Variables.
4. Deploy. Next.js Server Actions/route handlers run as serverless functions —
   no separate backend server is needed.
   > Note: Vercel's free **Hobby** tier is for non-commercial use; a business site
   > technically needs **Pro**.

## Architecture

```
src/
├── app/                    # Next.js App Router pages + server actions
│   ├── actions/booking.ts  # `submitTrialBooking` server action
│   ├── about/  gallery/  packages/  contact/
│   ├── globals.css
│   ├── layout.tsx          # Site shell (nav + footer + WhatsApp FAB)
│   └── page.tsx            # Home
├── components/
│   ├── atoms/              # Button, Eyebrow, Star, Logo, FormField, BigStat,
│   │                       # SocialPill, PhotoPlaceholder
│   ├── molecules/          # Polaroid, TiltCard, ScrapbookPhoto
│   └── organisms/          # SiteNav, SiteFooter, WhatsAppFab, CTABanner,
│       ├── home/           # HeroHome, ChipBelt, PromisePanel, PillarsHome,
│       │                   # ScrapbookGrid, TrialCTA, PackagesPeek
│       ├── about/          # AboutHero, StoryBlock, StaffSection, DailyRoutine,
│       │                   # ValuesStrip, FAQSection
│       ├── gallery/        # GalleryHero, GalleryFilter, VideoTestimonials, GalleryCTA
│       ├── packages/       # PackagesHero, PackagesCards, ComparisonTable,
│       │                   # IncludedSection, PackagesFAQ, PackagesCTA
│       ├── contact/        # ContactHero, ContactInfoCard, BranchesSection,
│       │                   # MapSection, SocialSection
│       └── forms/          # MiniTrialForm, BookTrialForm
└── lib/
    ├── site-config.ts      # Single source of truth for branches, hours, social
    └── utils.ts            # cn() helper
```

## Design system

- **Brand tokens** (yellow/sky/coral/mint/cream/ink) live in `tailwind.config.ts` and match the `brand.css` from the design handoff.
- **Typography**: Fraunces (display), Nunito (body), Caveat (hand-drawn) — loaded from Google Fonts.
- **UI library**: Radix UI primitives (Accordion, Slot) + Lucide icons + Framer Motion for the gallery filter transitions.

## Configuration

Update `src/lib/site-config.ts` to change:
- WhatsApp number, social handles
- Hours
- Branch addresses & phone numbers

The booking server action (`src/app/actions/booking.ts`) saves each request to
MongoDB and sends an SMTP notification — submissions then show up in `/admin`.
