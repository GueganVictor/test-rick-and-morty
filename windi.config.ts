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
        'rick-green': '#97ce4c',
        'rick-green-darken': '#7eb431',
        beige: '#fde0b2',
      },
      fontFamily: {
        // sans: "Roboto",
      },
    },
  },
});

export default config;
