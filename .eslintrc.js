module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['react', 'prettier', 'standard', 'compat'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    impliedStrict: true,
  },
  env: {
    es6: true,
    browser: true,
  },
  /*
  settings: {
    polyfills: ['fetch', 'promises'],
  },
  */
  rules: {
    'prettier/prettier': 'error',
    'compat/compat': 'error',
  },
}
