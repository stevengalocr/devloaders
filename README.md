# GaloDev Downloader

Fast, free downloader for Instagram Reels and TikTok videos — no watermarks, no sign-up, no friction.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion 11 |
| 3D | Spline (`@splinetool/react-spline` v4) |
| API | RapidAPI |
| Deploy | Vercel |

---

## Local setup

### Prerequisites

- Node.js 18+
- A [RapidAPI](https://rapidapi.com) account subscribed to both APIs listed below

### Steps

```bash
git clone https://github.com/stevengalocr/devloaders.git
cd devloaders
npm install
cp .env.local.example .env.local
# Edit .env.local and paste your RAPIDAPI_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RAPIDAPI_KEY` | ✅ | Your RapidAPI key (same key for all RapidAPI endpoints) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL for SEO, OG tags, sitemap — e.g. `https://yourdomain.com` |

### RapidAPI subscriptions

Subscribe (free tier available) to **both** APIs:

| API slug | Platform |
|---|---|
| `instagram-downloader-download-instagram-stories-videos4` | Instagram Reels |
| `tiktok-downloader-download-tiktok-videos-without-watermark` | TikTok |

Your key is shown in **Header Parameters → X-RapidAPI-Key** on any RapidAPI endpoint page.

---

## Deployment (Vercel)

1. Push to GitHub (already done)
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in **Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `RAPIDAPI_KEY` | your key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-deployment.vercel.app` |

4. Deploy — every push to `main` redeploys automatically.

---

## Architecture

```
galodev-downloaders/
├── app/
│   ├── page.tsx               # Client hero: platform switcher + Spline 3D robot
│   ├── layout.tsx             # Root layout with full SEO metadata (OG, Twitter, canonical, icons)
│   ├── globals.css            # Tailwind base + custom utilities (glass, dot-grid, noise)
│   ├── opengraph-image.tsx    # Dynamic 1200×630 OG image (edge runtime)
│   ├── robots.ts              # Blocks /api/* from crawlers, points to sitemap
│   ├── sitemap.ts             # XML sitemap
│   ├── manifest.ts            # PWA web manifest (standalone, theme #7c3aed)
│   ├── favicon.ico            # Multi-size favicon (16 / 32 / 48 px, RGBA)
│   ├── icon.png               # Default app icon 192×192 (Next.js auto-detected)
│   ├── apple-icon.png         # Apple touch icon 180×180 (Next.js auto-detected)
│   └── api/
│       └── download/
│           ├── route.ts       # POST: URL validation + rate limit + RapidAPI call
│           └── proxy/
│               └── route.ts  # GET: streams video blobs to bypass CDN CORS
│
├── components/
│   ├── tools/
│   │   ├── SocialDownloader.tsx  # Main interactive downloader
│   │   ├── ReelsDownloader.tsx   # Thin wrapper (platform="reels")
│   │   └── TikTokDownloader.tsx  # Thin wrapper (platform="tiktok")
│   └── ui/
│       ├── spotlight.tsx         # Aceternity SVG spotlight
│       ├── splite.tsx            # Lazy Spline 3D scene loader
│       └── card.tsx              # shadcn-style Card primitives
│
├── public/
│   └── icons/
│       ├── galodev-icon-source.png   # Master source icon (1254×1254)
│       ├── favicon-16.png            # Browser tab (16×16)
│       ├── favicon-32.png            # Browser tab HiDPI / shortcut (32×32)
│       ├── favicon-48.png            # Windows taskbar (48×48)
│       ├── apple-touch-icon.png      # iOS "Add to Home Screen" (180×180)
│       ├── icon-192.png              # Android Chrome icon (192×192)
│       ├── icon-512.png              # Android splash / Play Store (512×512)
│       ├── icon-maskable-192.png     # Android adaptive icon 192×192
│       ├── icon-maskable-512.png     # Android adaptive icon 512×512
│       └── og-icon.png              # Open Graph supplemental (512×512)
│
├── lib/
│   └── utils.ts               # cn() — clsx + tailwind-merge
│
├── .env.local.example
├── next.config.mjs            # Security headers + image remote patterns
├── tailwind.config.ts         # Custom animations (aurora, spotlight, float)
└── tsconfig.json
```

---

## Icons & PWA

The app is fully installable as a PWA on iOS and Android. All icons derive from a single **1254×1254 source** (`public/icons/galodev-icon-source.png`).

| File | Size | Use |
|---|---|---|
| `app/favicon.ico` | 16 / 32 / 48 px | Browser tab, bookmarks |
| `app/apple-icon.png` | 180×180 | iOS "Add to Home Screen" |
| `app/icon.png` | 192×192 | Android / general |
| `public/icons/icon-512.png` | 512×512 | Android splash screen |
| `public/icons/icon-maskable-*.png` | 192 / 512 px | Android adaptive icons |

The `app/manifest.ts` exports a Next.js `MetadataRoute.Manifest` with:
- `display: "standalone"` — launches without browser chrome
- `theme_color: "#7c3aed"` — matches brand violet
- `background_color: "#0a0714"` — dark splash background
- Both `any` and `maskable` icon purposes for full Android compatibility

### Regenerating icons

If the source image changes, regenerate with:

```bash
node -e "
const sharp = require('sharp');
// edit sizes array as needed, then run
"
```

Or replace `public/icons/galodev-icon-source.png` and re-run the generation script.

---

## API reference

### `POST /api/download`

**Request**
```json
{ "url": "https://www.instagram.com/reel/ABC123/" }
```

**Response — success**
```json
{
  "success": true,
  "data": {
    "platform": "instagram",
    "title": null,
    "thumbnail": "https://cdn.example.com/thumb.jpg",
    "downloads": [
      { "label": "HD", "url": "https://cdn.example.com/video.mp4", "type": "video" }
    ]
  }
}
```

| Status | Meaning |
|---|---|
| `200` | OK |
| `400` | URL missing, too long, or not from an allowed domain |
| `422` | Video not found or private |
| `429` | Rate limit exceeded |
| `503` | `RAPIDAPI_KEY` not configured |

---

## Security

| Layer | Measure |
|---|---|
| HTTP headers | HSTS · X-Frame-Options · X-Content-Type-Options · Referrer-Policy · Permissions-Policy |
| Rate limiting | 5 requests / IP / 60 s — returns HTTP 429 |
| URL allowlist | Only `instagram.com` and `tiktok.com` accepted — prevents SSRF |
| URL length cap | 2 048 character maximum |
| Key isolation | `RAPIDAPI_KEY` is server-only — never sent to the client bundle |
| Proxy allowlist | `/api/download/proxy` only forwards to known CDN hostnames |

---

## License

MIT
