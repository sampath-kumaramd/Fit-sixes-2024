import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    screens: {
      sd: '520px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1400px',
    },
    extend: {
      fontFamily: {
        schluber: ['var(--font-schluber)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        yellow: 'hsl(var(--yellow))',
        darkBlue: 'hsl(var(--dark-blue))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        flip: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(-180deg)' },
        },
        fliptop: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-90deg)' },
        },
        flipbottom: {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'letter-right-fill': {
          '0%': { width: '0' },
          '35%': { width: '40%' },
          '65%': { width: '40%' },
          '100%': { width: '100%' },
        },
        'flip-down': {
          '0%': { transform: 'rotateX(0)', opacity: '1' },
          '100%': { transform: 'rotateX(-180deg)', opacity: '0' },
        },
        'flip-up': {
          '0%': { transform: 'rotateX(180deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'letter-right-fill': 'letter-right-fill 3s linear infinite',
        shimmer: 'shimmer 1.5s linear infinite',
        flip: 'flip 0.6s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        'flip-down':
          'flip-down 0.6s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        'flip-up': 'flip-up 0.6s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        fliptop: 'fliptop 0.45s both',
        flipbottom: 'flipbottom 0.45s 0.45s both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
