import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'GaloDev — Descargador de Reels y TikToks',
    template: '%s | GaloDev',
  },
  description:
    'Descarga Reels de Instagram y TikToks sin marca de agua. Gratis, rápido y sin registro.',
  keywords: [
    'descargar reels',
    'descargar tiktok',
    'sin marca de agua',
    'instagram downloader',
    'tiktok downloader',
    'galodev',
  ],
  authors: [{ name: 'GaloDev' }],
  creator: 'GaloDev',

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'GaloDev Downloader',
    title: 'GaloDev — Descargador de Reels y TikToks',
    description:
      'Descarga Reels de Instagram y TikToks sin marca de agua. Gratis, rápido y sin registro.',
    locale: 'es_ES',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GaloDev — Descargador de Reels y TikToks',
    description: 'Descarga Reels y TikToks sin marca de agua. Gratis y sin registro.',
    creator: '@galodev',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: '#020202',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black antialiased">{children}</body>
    </html>
  );
}
