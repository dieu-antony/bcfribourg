import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
} as Config;

// import { Config } from "tailwindcss";
// import { fontFamily } from "tailwindcss/defaultTheme";

// export default {
//   content: ["./src/**/*.tsx"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["var(--font-sans)", ...fontFamily.sans],
//       },
//       colors: {
//         "picton-blue": {
//           "50": "#effaff",
//           "100": "#def3ff",
//           "200": "#b6eaff",
//           "300": "#75dcff",
//           "400": "#2ccbff",
//           "500": "#00afef",
//           "600": "#0091d4",
//           "700": "#0073ab",
//           "800": "#00618d",
//           "900": "#065174",
//           "950": "#04334d",
//         },
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//   ],
// } as Config;
