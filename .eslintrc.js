module.exports = {
  extends: [
    'standard',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
    // 'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    'flowtype',
    'flowtype-errors',
    'react',
    'prettier',
    'standard',
    'compat',
    // 'jsx-a11y',
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
    'flowtype-errors/show-errors': 'error',
    'compat/compat': 'error',
  },
}
