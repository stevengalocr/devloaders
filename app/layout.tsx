import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/* ── Metadata ───────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'GaloDev — Descargador de Reels y TikToks sin Marca de Agua',
    template: '%s | GaloDev',
  },

  icons: {
    icon: [
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192.png',   sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png',   sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icons/favicon-32.png',
  },

  description:
    'Descarga Reels de Instagram y videos de TikTok sin marca de agua, gratis y sin registro. Rápido, sin límites. Free Instagram Reels & TikTok video downloader — no watermark, no sign-up.',

  keywords: [
    /* Spanish */
    'descargar reels', 'descargar tiktok', 'sin marca de agua',
    'descargador de reels', 'descargador tiktok', 'bajar reels instagram',
    'bajar videos tiktok', 'descargar videos instagram', 'descargar videos tiktok',
    'reels sin marca de agua', 'tiktok sin marca de agua', 'galodev',
    'descargador gratis', 'descargador sin registro',
    /* English */
    'download reels', 'download tiktok', 'instagram reels downloader',
    'tiktok video downloader', 'no watermark', 'free video downloader',
    'save instagram reels', 'save tiktok videos without watermark',
    /* Portuguese */
    'baixar reels', 'baixar tiktok', "sem marca d'água",
    'baixar videos instagram', 'baixar videos tiktok', 'baixar reels gratis',
  ],

  authors: [{ name: 'GaloDev', url: siteUrl }],
  creator: 'GaloDev',
  publisher: 'GaloDev',

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'GaloDev Downloader',
    title: 'GaloDev — Descarga Reels y TikToks sin Marca de Agua',
    description:
      'Descarga Reels de Instagram y TikToks sin marca de agua. Gratis, rápido y sin registro. También disponible en English y Português.',
    locale: 'es_ES',
    alternateLocale: ['en_US', 'pt_BR'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GaloDev — Descarga Reels y TikToks gratis',
    description:
      'Descarga Reels y TikToks sin marca de agua. Gratis, rápido y sin registro.',
    creator: '@galodev',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* hreflang — single URL serves all three languages client-side */
  alternates: {
    canonical: siteUrl,
    languages: {
      es: siteUrl,
      en: siteUrl,
      pt: siteUrl,
      'x-default': siteUrl,
    },
  },

  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
};

/* ── JSON-LD structured data ────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GaloDev Downloader',
  url: siteUrl,
  description:
    'Download Instagram Reels and TikTok videos without watermarks — free, fast, no sign-up required.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Works in all modern browsers.',
  inLanguage: ['es', 'en', 'pt'],
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Download Instagram Reels without watermark',
    'Download TikTok videos without watermark',
    'Free, no registration required',
    'Available in Spanish, English, and Portuguese',
    'MP4 video and MP3 audio download',
  ],
  provider: {
    '@type': 'Organization',
    name: 'GaloDev',
    url: siteUrl,
  },
};

/* ── Layout ─────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
