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
      backgroundImage: {
        'login-mask':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.89) 15%, #FFF 32%, #FFF 100%)',
      },
      boxShadow: {
        gap: '0px 2px 2px 0px rgba(0, 0, 0, 0.05)',
        'gap-lg': '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        main: '#0435ab',
        orange: '#ff8c00',
        'course-image': '#CBE8BD',
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
      maxWidth: {
        homepage: '904px',
        course: '1092px',
      },
      zIndex: {
        header: '1000000',
      },
    },
  },
  plugins: [],
}
