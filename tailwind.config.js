/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     screens: {
       'xs': {'max': '639px'},
       'sm': {'min': '640px', 'max': '767px'},
       'md': {'min': '768px'},
       'lg': {'min': '1024px'},
       'xl': {'min': '1280px'},
       '2xl': {'min': '1536'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      // 'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      // 'lg': {'min': '1024px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      //'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      //'2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
     },
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/aspect-ratio'),
  ],
}