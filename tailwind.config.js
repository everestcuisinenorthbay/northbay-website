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
        baskerville: ["Baskerville", "ui-serif", "Georgia", "serif"],
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Baskerville", "ui-serif", "Georgia", "serif"],
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
    },
  },
  plugins: [],
}; 