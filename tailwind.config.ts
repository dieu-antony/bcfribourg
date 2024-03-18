import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        "picton-blue": {
          "50": "#effaff",
          "100": "#def3ff",
          "200": "#b6eaff",
          "300": "#75dcff",
          "400": "#2ccbff",
          "500": "#00afef",
          "600": "#0091d4",
          "700": "#0073ab",
          "800": "#00618d",
          "900": "#065174",
          "950": "#04334d",
        },
      },
    },
  },
  plugins: [],
} as Config;
