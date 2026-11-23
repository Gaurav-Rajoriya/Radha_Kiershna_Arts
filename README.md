# Radha Kirshna Art's — Website (React + TypeScript + Vite)

## Run (on your computer)
```bash
npm install
npm run dev          # development
npm run build        # production build -> dist/
npm run preview      # preview the build
npm run typecheck    # optional TypeScript check
```

## Set your email (one place)
Copy `.env.example` to `.env` and set `VITE_CONTACT_EMAIL=your@email`. Forms use FormSubmit (`formsubmit.co/ajax/<email>`).
The first submission sends FormSubmit an activation email to that address; click the link in it once. Until the email is set, sending is disabled.
Site name, logo URL and nav live in `src/config/site.ts`. Logo URL is the one you supplied; override with `VITE_LOGO_URL` or place a file in `public/images/` and point to it.

## Structure
- `src/pages/Exhibition.tsx` real 3D gallery (React Three Fiber): Room I = exactly six paintings revealed one by one, long pause after the sixth, camera turns to the architectural gate and walks into Room II (remaining works). Camera and reveals are driven by GSAP ScrollTrigger progress; Lenis smooth scroll.
- `src/pages/Collection.tsx` circular two-ring "stepped" 3D collection (drag to turn, hover/tap to bring forward, click to open); plain grid on narrow screens.
- `src/pages/Home.tsx` opening journey: logo reveal, about, art introduction, exhibition invitation.
- `src/pages/Content.tsx` About, Artist, Craftsmanship, Materials, Process, Commission, Contact, Collector Enquiry.
- `src/data/artworks.ts`, `src/data/content.ts` data extracted from your original source file (prices deliberately excluded). Add a work by adding an entry and its image under `public/images/artworks/`.
- `public/images/reference/` your two gallery reference images. `public/videos/README.md` video notes.

## Honest status
Not run, not built, not browser-tested by the author (no network/npm in the authoring sandbox). Expect small fixes on first run; see the notes in the delivery message.
