export const siteConfig = {
  name: "Lighthouse Daycare & Montessori",
  tagline: "The brightest part of every day.",
  description:
    "Rawalpindi's favorite daycare and Montessori — caring for little ones from 2 months onwards since 2019.",
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
      name: "Main Branch",
      address: "Chaklala Scheme III, Rawalpindi",
      phone: "+92 300 0000001",
      hours: "Mon–Sat · 7am–6pm",
      lat: 33.5869924,
      lng: 73.0879666,
      mapsHref: "https://maps.app.goo.gl/DBxV2xXUCUoQuvHD8",
    },
    {
      name: "Second Branch",
      address: "Chaklala Scheme III, Rawalpindi",
      phone: "+92 300 0000002",
      hours: "Mon–Sat · 7am–6pm",
      lat: 33.58638,
      lng: 73.087296,
      mapsHref: "https://maps.app.goo.gl/2awL9TLt2gVeewhs5",
    },
  ],
  nav: [
    { id: "home", label: "Home", href: "/" },
    { id: "learning-lounge", label: "Learning Lounge", href: "/learning-lounge" },
    { id: "gallery", label: "Gallery", href: "/gallery" },
    { id: "packages", label: "Packages", href: "/packages" },
    { id: "contact", label: "Contact", href: "/contact" },
    { id: "about", label: "About", href: "/about" },
  ] as const,
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
