/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: '320px',
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2536px',
    },
    extend: {
      colors: {
        gray: "#fafafa",
        text: "#030229",
        mediumslateblue: "#605bff",
        darkslateblue: "#382c7c",
        white: "#fff",
      },
      spacing: {},
      fontFamily: {
        nunito: "Nunito",
      },
    },
    fontSize: {
      md: '27.2px',
      xxs: '10px',
      xs: '12px',
      sm: '14px',
      tiny: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '64px',
      '7xl': '80px',
    },
    fontWeight: {
      100: 100,
      200: 200,
      300: 300,
      400: 400,
      500: 500,
      600: 600,
      700: 700,
      800: 800,
      900: 900
    },
  },
  corePlugins: {
    preflight: false,
  },
};
