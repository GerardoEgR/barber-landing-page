// prettier.config.mjs
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  // Opciones generales (ajusta a tu preferencia)
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
