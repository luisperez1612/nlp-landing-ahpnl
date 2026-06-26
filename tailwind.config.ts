import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['var(--font-dancing)', 'cursive'],
        sans: ['var(--font-open-sans)', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#E8602C',
          navy: '#1a2744',
          gold: '#D4AF37',
        },
      },
    },
  },
  plugins: [],
}

export default config
