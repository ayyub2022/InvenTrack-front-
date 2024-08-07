module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
      screens: { lg: { max: "1440px" }, md: { max: "1050px" }, sm: { max: "550px"} },
      extend: {
          colors: {
              amber: { 200: "#ffdb92", 500: "#ffc107", 700: "#dba400", a400: "#fbf00" },
              black: { 900: "#000000", "900 19": "#00000019", "900 3f": "#0000003f", "900 ad": "#000000ad" },
              blue: { 500: "#2196f3", 600: "#1e88e5", 800: "#1565c0", "600 35": "#1e88e535" },
              blue_gray: { 50: "#edf0f2", 100: "#d9d9d9", 900: "#1b4332" },
              cyan: { a100: "#93fbf5" },
              deep_orange: { a400: "#ff3d00" },
              deep_purple: { 500: "#682fc3" },
              gray: {
                  200: "#eaeaea",
                  400: "#cacaca",
                  500: "#f8f8f8",
                  900: "#3e3f10",
                  "900_01": "#110153f",
                  "900_02": "#131313",
              },
              green: { 400: "#52b788", 600: "#37b734" },
              indigo: { 50: "#e4e6ff", a400: "#5e6eff" },
              light_green: { 300: "#cbe784" },
              orange: { a100: "#fed96a" },
              purple: { 700: "#7400b8" },
              teal: { "900_3f": "#0024453f" },
              white: { a700: "#ffffff" },
              yellow: { 400: "#ffe55e"},
          },
          boxShadow: {
              xs: "2px 4px 9px 0 #0000003f",
              sm: "2px 4px 19px 0 #0024453f",
              md: "0 1px 0 #00000019",
              lg: "0 4px 4px 0 #0000003f",
              xl: "2px 4px 7px 0 #0024453f",
              "2xl": "4px -2px 7px 0 #0000003f",
          },
          backgroundImage: {
              gradient: "linear-gradient(180deg, #7400b8, #682fc3)",
              gradient1: "linear-gradient(180deg, #1e88e5, #1e88e5)",
              gradient2: "linear-gradient(180deg, #1565c0, #2196f3)",
          },
          fontFamily: { poppins: "Poppins", inter: "Inter", avenirnext: "Avenir Next", helvetica: "Helvetica" },
      },
  },
  plugins: [require("@tailwindcss/forms")],
};