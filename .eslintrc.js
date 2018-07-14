module.exports = {
  extends: [
    'standard',
    'standard-react',
    'plugin:flowtype/recommended',
    // 'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: [
    'flowtype',
    'prettier',
    'compat',
    // 'jsx-a11y',
    // 'flowtype-errors',
  ],
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
    // 'flowtype-errors/show-errors': 'error',
  },
}
