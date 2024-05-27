import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

export const colors = {
  PRIMARY: "#1F2B69",
  SECONDARY: "#77FF60",
}
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-custom': {
          'DEFAULT': '#F5F5F5',
          100: '#D9D9D9',
          200: '#8D8D8D',
          300: '#1E1E1E',
        },
        secondary: colors.SECONDARY,
        primary: colors.PRIMARY,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          secondary: colors.SECONDARY,
          primary: colors.PRIMARY,
        },
      },
    },
  })],
};
export default config;
