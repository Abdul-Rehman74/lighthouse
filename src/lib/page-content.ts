/** Client-requested defaults, shared by the public site and admin editor. */
export const DEFAULT_PAGE_CONTENT = {
  storyHeading: "For Families looking for Trusted Support",
  storyBody: "Since opening in 2019, Lighthouse has been a guiding light for families, built on the belief that quality care and learning should be accessible to every child. What began as a vision to support busy families has grown into a trusted environment where children from 2 months onwards are nurtured with care, comfort, and confidence.\n\nOver the years, Lighthouse has continued to grow with a dedicated team of 22 trained teachers and 5 professional nannies, providing a safe, hygienic, and teacher-monitored environment.\n\nAs a guiding light for children of all abilities, we are committed to creating an inclusive environment where every child is understood, supported, and encouraged to reach their full potential.",
  faqHeading: "Have more questions?",
  faqDescription: "Our Admin Team is here to guide you. Visit our Contact Page — we’d love to hear from you.",
  contactHeading: "Welcome to Your Harbour",
  contactDescription: "Let us help you navigate your child's educational voyage with care, compassion, and confidence.",
  contactWhatsappMessage: "Every journey starts with a conversation!",
  branchOneName: "Main branch",
  branchTwoName: "Branch 2",
  packagesCtaHeading: "Experience Lighthouse",
  packagesCtaDescription: "Bring your little one for a complimentary trial. No pressure, no commitment—just an opportunity to experience the Lighthouse difference.",
  galleryCtaHeading: "Pictures Capture Moments, But Visits Create Memories",
  galleryCtaDescription: "Come experience the warmth of Lighthouse firsthand. Book a free trial visit and let your little one explore, learn, and feel at home.",
  galleryHeading: "Glimpses Along the Journey",
  galleryDescription: "Small moments that reflect the warmth, care, and meaningful experiences that guide our little learners every day.",
  galleryUpdateNoteVisible: false,
  homeHeroIntro: "Welcome Aboard. Let’s Anchor Together",
  homeHeroTagVisible: false,
  homeHeroHeading: "Welcome Aboard to Lighthouse. Let’s Anchor Together",
  homeHeroHighlight: "Lighthouse",
  homeHeroSubheading: "A nurturing journey from infancy to elementary years.",
  homeHeroDescription: "Lighthouse brings together nurturing care, inclusive classrooms, and early intervention services to support each child's unique development.",
  homePromiseHeading: "Guiding Children.\nSupporting Families.\nGrowing Together.",
  homePromiseDescription: "At Lighthouse, we believe children thrive when they are surrounded by care, compassion, and connection. We provide families with a trusted space where children can grow, learn, and flourish—while parents have the confidence and peace of mind to nurture their own journeys too.",
  homeDaysChip: "Mon-Saturday",
  homeSafetyChip: "CCTV equipped rooms",
  homeLoungeHeading: "Beyond the Classroom: The Learning Lounge",
  homeLoungeDescription: "A dedicated space where children receive the support they need to thrive. From communication and social skills to confidence-building and personalized learning, we work together with families to unlock every child's potential.",
  includedVisible: false,
  comparisonVisible: false,
  branchPhoneVisible: false,
  branchHoursVisible: false,
};

export type PageContent = typeof DEFAULT_PAGE_CONTENT;

/** Fill missing fields for existing databases; preserve saved blanks and false. */
export function resolvePageContent(saved: Partial<PageContent>): PageContent {
  return Object.fromEntries(
    Object.entries(DEFAULT_PAGE_CONTENT).map(([key, fallback]) => {
      const value = key === "homeHeroHeading"
        && saved.homeHeroSubheading === undefined
        && saved.homeHeroHeading === DEFAULT_PAGE_CONTENT.homeHeroSubheading
        ? DEFAULT_PAGE_CONTENT.homeHeroHeading
        : saved[key as keyof PageContent];
      return [key, typeof value === typeof fallback ? value : fallback];
    }),
  ) as PageContent;
}
