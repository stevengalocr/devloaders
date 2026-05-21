import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GaloDev — Descargador de Reels y TikToks',
  description:
    'Descarga Reels de Instagram y TikToks sin marca de agua. Gratis, rápido y sin registro.',
  keywords: ['descargar reels', 'descargar tiktok', 'sin marca de agua', 'instagram', 'tiktok'],
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black antialiased">{children}</body>
    </html>
  );
}
