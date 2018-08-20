module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    // 'plugin:security/recommended',
    'plugin:flowtype/recommended',
    // 'plugin:promise/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:unicorn/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: [
    'flowtype',
    'prettier',
    'compat',
    'security',
    'jsx-a11y',
    'promise',
    'unicorn',
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
  settings: {
    react: {
      version: '16.3',
    },
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
