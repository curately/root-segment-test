import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "oklch(98.41% 0.01 191.40)",
          100: "oklch(95.44% 0.05 190.00)",
          200: "oklch(91.29% 0.09 188.74)",
          300: "oklch(85.79% 0.12 187.30)",
          400: "oklch(78.64% 0.13 185.49)",
          500: "oklch(70.47% 0.12 184.47)",
          600: "oklch(60.02% 0.10 184.70)",
          700: "oklch(51.06% 0.09 185.37)",
          800: "oklch(43.62% 0.07 185.61)",
          900: "oklch(38.57% 0.06 186.80)",
          950: "oklch(27.60% 0.05 185.57)",
        },
        secondary: {
          50: "xxxxxxxx",
          100: "xxxxxxxx",
          200: "xxxxxxxx",
          300: "xxxxxxxx)",
          400: "xxxxxxxx",
          500: "xxxxxxxx",
          600: "xxxxxxxx",
          700: "xxxxxxxx",
          800: "xxxxxxxx",
          900: "xxxxxxxx",
          950: "xxxxxxxx",
        },
        error: {
          50: "oklch(98.83% 0.005 20)",
          100: "oklch(96.68% 0.02 20)",
          200: "oklch(92.19% 0.04 20)",
          300: "oklch(86.13% 0.08 20)",
          400: "oklch(80.08% 0.11 20)",
          500: "oklch(74.22% 0.15 20)",
          600: "oklch(62.7% 0.14 20)",
          700: "oklch(53.52% 0.12 20)",
          800: "oklch(41.99% 0.09 20)",
          900: "oklch(30.66% 0.07 20)",
          950: "oklch(19.34% 0.04 20)",
        },
        warning: {
          50: "xxxxxxxx",
          100: "xxxxxxxx",
          200: "xxxxxxxx",
          300: "xxxxxxxx)",
          400: "xxxxxxxx",
          500: "xxxxxxxx",
          600: "xxxxxxxx",
          700: "xxxxxxxx",
          800: "xxxxxxxx",
          900: "xxxxxxxx",
          950: "xxxxxxxx",
        },
        success: {
          50: "oklch(98.83% 0.005 140)",
          100: "oklch(96.29% 0.02 140)",
          200: "oklch(91.41% 0.04 140)",
          300: "oklch(84.57% 0.08 140))",
          400: "oklch(77.73% 0.11 140)",
          500: "oklch(71.09% 0.15 140)",
          600: "oklch(59.77% 0.14 140)",
          700: "oklch(51.17% 0.12 140)",
          800: "oklch(40.04% 0.09 140)",
          900: "oklch(29.49% 0.07 140)",
          950: "oklch(18.75% 0.04 140)",
        },
        gray: {
          50: "oklch(98.83% 0.005 275)",
          //100: 'oklch(96.48% 0.02 275)',
          100: "oklch(96.48% 0 0)",
          200: "oklch(91.8% 0.02 275)",
          300: "oklch(85.35% 0.02 275)",
          400: "oklch(78.91% 0.02 275)",
          500: "oklch(72.66% 0.02 275)",
          600: "oklch(61.33% 0.02 275)",
          700: "oklch(52.34% 0.02 275)",
          800: "oklch(41.21% 0.02 275)",
          900: "oklch(30.27% 0.02 275)",
          950: "oklch(19.34% 0.02 275)",
        },
        /*
        brand: {
          50: '#ecfbff',
          100: '#cff5fe',
          200: '#a5ebfc',
          300: '#67ddf9',
          400: '#22c6ee',
          500: '#06acd4',
          600: '#0891b2',
          700: '#0e7790',
          800: '#156275',
          900: '#165463',
          950: '#083844',
        },
        */
        brand: {
          50: "oklch(98.83% 0.005 210)",
          100: "oklch(96.29% 0.02 210)",
          200: "oklch(91.41% 0.04 210)",
          300: "oklch(84.57% 0.08 210)",
          400: "oklch(77.73% 0.11 210)",
          500: "oklch(70.9% 0.15 210)",
          600: "oklch(59.57% 0.14 210)",

          700: "oklch(50.78% 0.12 210)",
          800: "oklch(39.84% 0.09 210)",
          900: "oklch(29.1% 0.07 210)",
          950: "oklch(18.16% 0.04 210)",
        },
        darkest: "#141a33", // Used for heading & body text
        dark: "#505673", // Used for secondary/supporting text
        medium: "#878ca8", // Used for non-decorative borders
        light: "#dadef2", // Used for decorative borders such as dividers
        lightest: "#f5f6fa", // Used for alternate backgrounds
        //brand: '#44708B', //dark blue
        //accent: '#A5F1CC', //mint

        //brand: '#0891b2', //cyan-600
        //brand: '#0e7490', //cyan-700
        accent: "#5eead4", //emerald-300
        //emerald-300
        "accent-light": "#A5F1CC", //mint
        //primary: '#14b8a6', //teal-500
        //primary: '#0d9488',
        //accent:#6ee7b7, //emerald-300 ------ button color teal-500?
        //brand: '#eab308', //yellow-500
        //brand: '#c084fc', //purple-500

        pill: "#D9D9D9", //light grey
        search: "#F5F5F5",
        //'accent-dark': 'rgba(52, 52, 52, 0.12)', //darker mint
        "accent-dark": "#56ae76", // darker mint
        "brand-dark": "#234052", //darker blue
        "brand-light": "#343434",
        "search-light": "#F5F5F5",
        // dark: '#343434', //dark grey
        // medium: '#757575', // mid grey
        logo: "#1C4157", //very dark blue
        ivory: "#F5F5F5",
        "input-text": "#343434",

        "dark-grey": "rgb(41,41,41)",
        "map-icon": "#cd1076",
        //default: '#eab308',
      },
      borderRadius: {
        "4xl": "2.1875rem",
      },
      fontSize: {
        heading: "2rem",
        hero: "2.625rem",
      },
      lineHeight: {
        indicator: "1.125rem",
        button: "1.625rem",
      },
      fontFamily: {
        //header: ['var(--header-font)'],
        heading: ["var(--font-geist-sans)"],
        body: ["var(--font-geist-sans)"],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        xxl: "5rem",
        header: "65px",
        "header-lg": "70px",
        logo: "25px",
        "logo-lg": "30px",
        searchbar: "75px",
        "searchbar-lg": "80px",
        "inner-container": "1200px",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      maxWidth: {
        "hotel-container": "1120px",
      },

      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/typography")],
};
export default config;
