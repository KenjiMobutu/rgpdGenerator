/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Remplacez 'tailwindcss' par ceci :
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;
