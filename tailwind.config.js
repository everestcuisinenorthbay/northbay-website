/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        baskerville: ["Libre Baskerville", "Baskerville", "Times New Roman", "Times", "serif"],
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Libre Baskerville", "Baskerville", "Times New Roman", "Times", "serif"],
      },
      colors: {
        everest: {
          green: '#234438',      // Deep green (primary)
          cream: '#f6f5f2',     // Off-white background
          beige: '#e6e1d5',     // Light beige (secondary background)
          gold: '#cfcab8',      // Gold/amber accent
          red: '#d93437',       // Accent red (sparingly)
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'only-xl': {'raw': '(min-width: 1280px) and (max-width: 1350px)'},
      },
    },
  },
  plugins: [],
}; 