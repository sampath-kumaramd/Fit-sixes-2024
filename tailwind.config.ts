import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
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
      screens: {
        '2xl': '1400px',
      },
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
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-180': '180deg',
      },
      transitionDuration: {
        '800': '800ms',
      },
      backgroundImage: {
        'custom-text-gradient':
          'linear-gradient(89.1deg, #ffae01 6%, #a1700d 16%, #36291a 26%, #020720 70%)',
      },
      fontSize: {
        '7xl': '7rem',
        '8xl': '8rem',
        '9xl': '9.5rem',
        '10xl': '11rem',
        '11xl': '12.5rem',
        '12xl': '14rem',
      },
      fontFamily: {
        schluber: ['var(--font-schluber)'],
        druktrial: ['var(--font-druktrial-medium)', 'sans-serif'],
        exon: ['Exon', 'sans-serif'],
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
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translate(0, 100px)',
            filter: 'blur(33px)',
          },
          to: {
            opacity: '1',
            transform: 'translate(0)',
            filter: 'blur(0)',
          },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        flip: {
          '0%': {
            transform: 'rotateX(0)',
          },
          '100%': {
            transform: 'rotateX(-180deg)',
          },
        },
        fliptop: {
          '0%': {
            transform: 'rotateX(0deg)',
          },
          '100%': {
            transform: 'rotateX(-90deg)',
          },
        },
        flipbottom: {
          '0%': {
            transform: 'rotateX(90deg)',
          },
          '100%': {
            transform: 'rotateX(0deg)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
          },
          '50%': {
            transform: 'translateY(0)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'letter-right-fill': {
          '0%': {
            width: '0',
          },
          '35%': {
            width: '40%',
          },
          '65%': {
            width: '40%',
          },
          '100%': {
            width: '100%',
          },
        },
        'flip-down': {
          '0%': {
            transform: 'rotateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'rotateX(-180deg)',
            opacity: '0',
          },
        },
        'flip-up': {
          '0%': {
            transform: 'rotateX(180deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'rotateX(0)',
            opacity: '1',
          },
        },
        pulse: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 var(--pulse-color)',
          },
          '50%': {
            boxShadow: '0 0 0 8px var(--pulse-color)',
          },
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
        bounce: 'bounce 1s infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
        pulse: 'pulse var(--duration) ease-out infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          color: 'transparen  t',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
        },
      });
    }),
  ],
} satisfies Config;

export default config;
