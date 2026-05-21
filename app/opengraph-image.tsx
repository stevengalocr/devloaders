import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GaloDev — Descargador de Reels y TikToks';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020202',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '-200px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.15), transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#71717a',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 32,
            display: 'flex',
          }}
        >
          GaloDev ↓
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.08,
            textAlign: 'center',
            letterSpacing: '-0.02em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>Descarga lo que</span>
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            más te gusta
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: '#71717a',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          Reels · TikToks · Sin marca de agua · Gratis
        </div>
      </div>
    ),
    { ...size }
  );
}
