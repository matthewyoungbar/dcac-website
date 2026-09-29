/**
 * Per-page <title>, description and link-preview image. Used twice: at build
 * time, src/prerender.tsx writes these into each page's <head> as Open Graph
 * tags (what Slack, iMessage, Facebook etc. read — they don't run JS), and in
 * the browser, app.tsx keeps document.title in step as you navigate.
 *
 * Every route in app.tsx needs an entry here; the prerender fails loudly if
 * one is missing.
 */

export const SITE_NAME = 'District of Columbia Aquatics Club'

/**
 * Absolute site URL, which og:image and og:url require. CI sets it from GitHub
 * Pages' own base_url, so a custom domain is picked up automatically.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://matthewyoungbar.github.io/dcac-website').replace(/\/$/, '')

interface ShareImage {
  /** file in public/og/ — 1200×630 JPEG, which every preview service accepts */
  file: string
  alt: string
}

const images = {
  intrasquad: { file: 'intrasquad-meet.jpg', alt: 'Dozens of DCAC swimmers gathered in an indoor pool, waving at the camera.' },
  pride: { file: 'pride-parade.jpg', alt: 'DCAC swimmers marching at the 2025 WorldPride parade in Washington, DC.' },
  meet: { file: 'meet-deck.jpg', alt: 'Four DCAC swimmers arm in arm on a pool deck at a meet.' },
  practice: { file: 'oxon-run.jpg', alt: 'About thirty DCAC swimmers gathered in the shallow end of an outdoor pool.' },
  lane: { file: 'lane-friends.jpg', alt: 'Three smiling DCAC swimmers in team caps, arms around each other in a pool lane.' },
  floats: { file: 'pride-floats.jpg', alt: 'Three DCAC members with pool floats at a DC Pride event.' },
} satisfies Record<string, ShareImage>

export interface PageMeta {
  /** page name; the tab title adds "· DCAC" (the home page uses the full club name) */
  title: string
  description: string
  image: ShareImage
}

const pages: Record<string, PageMeta> = {
  '/': {
    title: SITE_NAME,
    description: "DC's LGBTQ+ masters swim team. Every body, every stroke, every pace — and your first two practices are free.",
    image: images.intrasquad,
  },
  '/about': {
    title: 'About DCAC',
    description: "DC's LGBTQ+ masters swim team since 1988: coached practices for swimmers of every age and ability, and one of the largest USMS teams in the Potomac Valley.",
    image: images.pride,
  },
  '/schedule': {
    title: 'Practice schedule',
    description: 'Every DCAC practice on the calendar, with pools and times. Subscribe to get practices in your own calendar.',
    image: images.practice,
  },
  '/directions': {
    title: 'Pool directions',
    description: 'Where DCAC practices: addresses, parking, entrances, locker rooms, and the nearest Metro station for each pool.',
    image: images.practice,
  },
  '/competition': {
    title: 'Competition',
    description: 'From local Masters meets to IGLA+ world championships — DCAC competes, and wins. 11× IGLA World Champions.',
    image: images.meet,
  },
  '/coaches': {
    title: 'Coaches',
    description: "Meet the coaches who lead DCAC's practices.",
    image: images.intrasquad,
  },
  '/join': {
    title: 'How to join',
    description: 'Become a DCAC member in three steps: join U.S. Masters Swimming, register with DCAC, and sign up with DC Parks & Recreation.',
    image: images.practice,
  },
  '/trial': {
    title: 'Try a practice',
    description: 'Your first two DCAC practices are free. Here’s how to get cleared to swim as a trial swimmer.',
    image: images.lane,
  },
  '/faq': {
    title: 'FAQ',
    description: 'Answers for new swimmers: costs, skill level, where we swim, meets, and more.',
    image: images.floats,
  },
  '/records': {
    title: 'Team records',
    description: 'Every DCAC individual and relay record, in short course yards, short course meters, and long course meters.',
    image: images.meet,
  },
  '/scholarships': {
    title: 'Scholarships',
    description: 'Help with membership dues and with competing at IGLA, including the Yolanda Markey and the Marcay Dickens & Joan Dever scholarship funds.',
    image: images.meet,
  },
  '/donate': {
    title: 'Donate',
    description: 'Support DCAC, a registered 501(c)(3). Donations fund scholarships so swimmers in financial need can train and compete.',
    image: images.intrasquad,
  },
  '/contact': {
    title: 'Contact us',
    description: "Reach DCAC's board by email, mail, or phone.",
    image: images.intrasquad,
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Page not found',
  description: pages['/'].description,
  image: images.intrasquad,
}

/** Metadata for a base-relative path; undefined for anything that isn't a page. */
export function metaFor(path: string): PageMeta | undefined {
  return pages[path.replace(/\/$/, '') || '/']
}

export function documentTitle(meta: PageMeta) {
  return meta.title === SITE_NAME ? SITE_NAME : `${meta.title} · DCAC`
}
