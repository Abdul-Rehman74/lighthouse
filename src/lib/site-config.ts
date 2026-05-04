export const siteConfig = {
  name: "Lighthouse Daycare & Montessori",
  tagline: "The brightest part of every day.",
  description:
    "Twin Cities' favorite daycare and Montessori — caring for little ones from 2 months onwards since 2019.",
  whatsapp: {
    display: "+92 300 0000000",
    href: "https://wa.me/923000000000",
  },
  social: {
    instagram: {
      handle: "@lighthousedaycare",
      href: "https://instagram.com/lighthousedaycare",
    },
    facebook: {
      handle: "Lighthouse Daycare",
      href: "https://facebook.com/lighthousedaycare",
    },
  },
  hours: {
    weekday: "Mon — Sat",
    time: "7:00am — 6:00pm",
    note: "Closed Sundays & gazetted holidays",
  },
  branches: [
    {
      name: "Islamabad Branch",
      address: "Sector F-10, Islamabad",
      phone: "+92 300 0000001",
      hours: "Mon–Sat · 7am–6pm",
      mapsHref: "https://maps.google.com/?q=Sector+F-10+Islamabad",
    },
    {
      name: "Rawalpindi Branch",
      address: "Bahria Town Phase 4, Rawalpindi",
      phone: "+92 300 0000002",
      hours: "Mon–Sat · 7am–6pm",
      mapsHref: "https://maps.google.com/?q=Bahria+Town+Phase+4+Rawalpindi",
    },
  ],
  nav: [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About", href: "/about" },
    { id: "gallery", label: "Gallery", href: "/gallery" },
    { id: "packages", label: "Packages", href: "/packages" },
    { id: "contact", label: "Contact", href: "/contact" },
  ] as const,
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
