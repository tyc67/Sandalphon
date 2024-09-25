/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1200px',
    },
    extend: {
      boxShadow: {
        gap: '0px 2px 2px 0px rgba(0, 0, 0, 0.05)',
        'gap-lg': '0px 4x 4px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        main: '#0435ab',
        orange: '#ff8c00',
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
      maxWidth: {
        homepage: '904px',
      },
    },
  },
  plugins: [],
}
