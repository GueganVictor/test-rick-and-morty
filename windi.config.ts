import { defineConfig } from 'vite-plugin-windicss';
import typography from 'windicss/plugin/typography';

const config = defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  attributify: true,
  theme: {
    extend: {
      screens: {
        xs: '530px',
      },
      colors: {
        // primary: "#2D7DD2",
      },
      fontFamily: {
        // sans: "Roboto",
      },
    },
  },
});

export default config;
