/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: ['disabled'],
      boxShadow: {
        button: "0px 0px 16px",
      },
      scale: {
        m: "0.35",
        p: "0.50",
      },
      height: {
        860: "860px",
        100: "28rem",
      },
      backgroundImage: {
        my_bg_image: "url('/src/assets/LandingImage.png')",
        login_image: "url('/src/assets/LoginImage.png')",
        my_bg_image_mobile: "url('/src/assets/LandingImageMobile.png')",
        card_bg_image: "url('/src/assets/RaceCardBackground.svg')",
        login_image: "url('/src/assets/LoginImage.png')",
      },
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    colors: {
      orange: {
        900: "#E8844E",
      },
      violet: {
        900: "#5e4bcb",
        700: "#9378FF",
        500: "#c8a7ff",
      },
      black: {
        700: "#151515",
        600: "#282828",
      },
      gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
    },
    textDecorationThickness: {
      3: "3px",
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
};
