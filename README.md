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

The booking server action (`src/app/actions/booking.ts`) currently logs submissions to the server console — drop in your CRM/email integration there.
