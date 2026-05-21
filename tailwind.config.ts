import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'aurora-1': 'aurora1 14s ease-in-out infinite alternate',
        'aurora-2': 'aurora2 16s ease-in-out infinite alternate',
        'aurora-3': 'aurora3 12s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
        aurora1: {
          '0%': { transform: 'translate(0%, 0%) scale(1)', opacity: '0.5' },
          '100%': { transform: 'translate(-12%, 8%) scale(1.25)', opacity: '0.3' },
        },
        aurora2: {
          '0%': { transform: 'translate(0%, 0%) scale(1.1)', opacity: '0.3' },
          '100%': { transform: 'translate(8%, -6%) scale(0.9)', opacity: '0.55' },
        },
        aurora3: {
          '0%': { transform: 'translate(4%, -4%) scale(0.9)', opacity: '0.4' },
          '100%': { transform: 'translate(-6%, 6%) scale(1.1)', opacity: '0.2' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
