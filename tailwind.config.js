/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // MAISON ARCHIVE palette — restrained, expensive, intentional
        vault: {
          black: '#0A0A0C', // deep near-black background
          panel: '#101013', // slightly raised surfaces
          gold: '#C5A572', // primary champagne gold accent
          goldlt: '#D4AF7A', // lighter gold for highlights
          ivory: '#F5F3EF', // soft off-white text
          grey: '#8B8B8F', // muted grey secondary text
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 120s linear infinite',
        'spin-slower': 'spin-slow 240s linear infinite',
        'fade-up': 'fade-up 0.6s ease both',
      },
    },
  },
  plugins: [],
}
