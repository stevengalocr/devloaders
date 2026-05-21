'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import SocialDownloader from '@/components/tools/SocialDownloader';

const WHOBEE_SCENE = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';

/* Lazy-load Spline — client-only, never SSR */
const InteractiveRobotSpline = dynamic(
  () =>
    import('@/components/ui/interactive-3d-robot').then((m) => ({
      default: m.InteractiveRobotSpline,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full border-t border-violet-500/40 animate-spin" />
        </div>
      </div>
    ),
  }
);

/* ── Platform config ──────────────────────────────────────────────── */

type Platform = 'reels' | 'tiktok';

const PLATFORMS = {
  reels: {
    label: 'Instagram',
    gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
    activePill: 'from-violet-600 to-fuchsia-600',
    glowColor: 'rgba(124,58,237,0.16)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    activePill: 'from-cyan-600 to-blue-600',
    glowColor: 'rgba(6,182,212,0.14)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
} as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── Shared robot renderer ────────────────────────────────────────── */

function RobotCanvas({ glowColor }: { glowColor: string }) {
  return (
    <>
      {/* Ambient platform glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 60%, ${glowColor}, transparent)`,
        }}
      />
      <InteractiveRobotSpline scene={WHOBEE_SCENE} className="w-full h-full" />
    </>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function Home() {
  const [platform, setPlatform] = useState<Platform>('reels');
  const pConfig = PLATFORMS[platform];

  return (
    <div className="relative min-h-screen bg-[#020202] overflow-x-hidden noise-overlay">

      {/* ── Aurora blobs ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div
          className="absolute -top-64 -left-64 w-[700px] h-[700px] rounded-full blur-[140px] animate-aurora-1"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -right-48 w-[550px] h-[550px] rounded-full blur-[120px] animate-aurora-2"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.10), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-48 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-aurora-3"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)' }}
        />
      </div>

      {/* ── Dot grid ────────────────────────────────────────────────── */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0 opacity-40" aria-hidden />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex items-center px-6 sm:px-10 py-5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span
              className={`text-xl font-bold bg-gradient-to-r ${pConfig.gradient} bg-clip-text text-transparent transition-all duration-700`}
            >
              GaloDev
            </span>
            <span className="text-xl font-bold text-white/20">↓</span>
            <span className="hidden sm:block text-xs font-mono text-zinc-600 border border-zinc-800 rounded-full px-2.5 py-0.5">
              downloader
            </span>
          </motion.div>
        </header>

        {/* ── Mobile robot (visible only < lg) ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="block lg:hidden relative h-64 sm:h-72 -mx-0 overflow-hidden"
        >
          {/* Top fade — hides any scene edge */}
          <div
            className="absolute top-0 inset-x-0 h-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 100%)' }}
          />

          <RobotCanvas glowColor={pConfig.glowColor} />

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #020202 20%, rgba(2,2,2,0.5) 70%, transparent 100%)' }}
          />
        </motion.div>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <main className="flex-1 flex items-center py-6 lg:py-10">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1.1fr] gap-8 lg:gap-6 items-center">

              {/* Left: Tool panel */}
              <div className="flex flex-col gap-7 w-full max-w-lg mx-auto lg:mx-0">

                {/* Heading */}
                <motion.div {...fadeUp(0)} className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold leading-[1.06] tracking-tight">
                    <span className="text-gradient-neutral">Descarga lo que</span>
                    <br />
                    <span className={`bg-gradient-to-r ${pConfig.gradient} bg-clip-text text-transparent transition-all duration-700`}>
                      más te gusta
                    </span>
                  </h1>
                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-sm">
                    Reels y TikToks sin marca de agua. Sin registro, sin esperas.
                  </p>
                </motion.div>

                {/* Platform switcher */}
                <motion.div {...fadeUp(0.1)}>
                  <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/8">
                    {(Object.entries(PLATFORMS) as [Platform, typeof PLATFORMS[Platform]][]).map(([key, cfg]) => {
                      const isActive = platform === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setPlatform(key)}
                          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-r ${cfg.activePill} text-white shadow-lg`
                              : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <span className={isActive ? 'text-white' : 'opacity-60'}>{cfg.icon}</span>
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Downloader */}
                <motion.div {...fadeUp(0.18)}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={platform}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                    >
                      <SocialDownloader platform={platform} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

              </div>

              {/* Right: Desktop robot (hidden on mobile) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.2 }}
                className="hidden lg:block relative self-stretch overflow-hidden"
                style={{ minHeight: '560px' }}
              >
                {/* Top fade */}
                <div
                  className="absolute top-0 inset-x-0 h-20 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 100%)' }}
                />

                {/* Platform glow + Spline */}
                <div className="absolute -inset-x-6 -top-10 bottom-0 relative">
                  <RobotCanvas glowColor={pConfig.glowColor} />
                </div>

                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 inset-x-0 h-40 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #020202 10%, rgba(2,2,2,0.6) 50%, transparent 100%)' }}
                />
              </motion.div>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 sm:px-10 py-5 flex items-center justify-between border-t border-white/[0.04]">
          <p className="text-xs text-zinc-700 font-mono">
            © {new Date().getFullYear()} GaloDev · Solo para contenido con permisos
          </p>
          <span className="text-xs font-mono text-zinc-800">v1.0</span>
        </footer>

      </div>
    </div>
  );
}
