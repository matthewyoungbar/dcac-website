# DCAC Website

The website for the District of Columbia Aquatics Club. Built with [Preact](https://preactjs.com/), [Vite](https://vite.dev/) and TypeScript, with [wouter](https://github.com/molefrog/wouter) for routing.

## Prerequisites

- [Node.js](https://nodejs.org/) 26 (the version CI builds with)
- [Yarn](https://classic.yarnpkg.com/) 1.x (`npm install -g yarn`, or `corepack enable`)

## Getting started

```sh
yarn install
cp .env.example .env    # then fill in the values — see below
yarn dev
```

The dev server runs at <http://localhost:5173> and reloads as you edit.

## Environment variables

The site runs without any of these, but the parts that depend on them will be empty.

| Variable | Used for | How to set it |
| --- | --- | --- |
| `VITE_GOOGLE_CALENDAR_API_KEY` | The practice schedule (`src/useSchedule.ts`), read from a public Google Calendar | In `.env`. A Google Cloud API key with the Calendar API enabled, restricted to the site's domain(s). |
Without the calendar key the schedule shows an error state and renders the normal Google Calendar embed.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Start the dev server with hot reload |
| `yarn build` | Type-check and build the production site into `dist/` |
| `yarn preview` | Serve the built `dist/` locally to check a production build |

## Project layout

```
index.html              Page shell, favicon and fonts
public/                 Static files served as-is (favicon, touch icon)
src/
  app.tsx               Routes
  app.css               Global styles
  pages/                One component (and stylesheet) per page
  components/           Shared components (header, footer, tiles, …)
  content/              Editable content: coaches.json, faq.json
  assets/               Images and logos
```

### Editing content

Coach bios and FAQ answers live in `src/content/*.json`. Photos they reference must be `.webp` files under `src/assets/`, named by their path from there, ex. `"photo": "coaches/coach_sam.webp"`. Coach photos are 480×600.

## Deployment

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`. The workflow can also be run manually from the Actions tab.

The deploy reads `VITE_GOOGLE_CALENDAR_API_KEY`from the repository's Actions secrets.

### Prerendering

`yarn build` prerenders every page to its own `index.html` (e.g. `dist/about/index.html`), plus a `404.html` for unknown paths, so direct links return a 200 and search engines see real content. The browser then hydrates that HTML. Pages are discovered by following internal links from the home page; a page nothing links to must be added to `additionalPrerenderRoutes` in `vite.config.ts`.

Each page's tab title, description, and link-preview image (the Open Graph tags Slack, iMessage, etc. read) come from `src/pageMeta.ts`. A new page needs an entry there, or the build fails. Preview images live in `public/og/` as 1200×630 JPEGs. Link previews need absolute URLs, so the deploy sets `VITE_SITE_URL` from GitHub Pages' own address.

Dynamically fetched content like the schedule and records still load live in the browser. Anything that reads the current date or `window` must do so in an effect, not during render, or the prerendered HTML won't match what the browser draws.
