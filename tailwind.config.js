/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#03060f',
          900: '#060a18',
          800: '#0a1024',
          700: '#0f1731',
        },
        neon: {
          50: '#e6f3ff',
          100: '#bfe0ff',
          200: '#80c2ff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      boxShadow: {
        'neon-sm': '0 0 12px rgba(26, 140, 255, 0.45)',
        neon: '0 0 24px rgba(26, 140, 255, 0.55), 0 0 48px rgba(26, 140, 255, 0.25)',
        'neon-lg': '0 0 40px rgba(26, 140, 255, 0.6), 0 0 80px rgba(26, 140, 255, 0.3)',
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 60px -20px rgba(0,0,0,0.7)',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-120vh) translateX(20px)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeScale: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(0) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(0) rotate(-360deg)' },
        },
      },
      animation: {
        floatUp: 'floatUp linear infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        riseIn: 'riseIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        fadeScale: 'fadeScale 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        gridMove: 'gridMove 20s linear infinite',
      },
    },
  },
  plugins: [],
};
