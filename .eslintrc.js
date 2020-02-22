module.exports = {
  root: true,

  parser: '@typescript-eslint/parser', // or 'babel-eslint'

  extends: [
    'eslint-config-standard-with-typescript',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
    'eslint-config-prettier/standard',
    'eslint-config-prettier/@typescript-eslint',
    'plugin:eslint-plugin-eslint-comments/recommended',
    'plugin:eslint-plugin-jest/recommended',
    'plugin:eslint-plugin-promise/recommended',
    'plugin:eslint-plugin-react/recommended',
    'plugin:eslint-plugin-import/errors',
    // 'plugin:eslint-plugin-jsx-a11y/recommended',
    // 'plugin:eslint-plugin-security/recommended',
    // 'plugin:eslint-plugin-unicorn/recommended',
  ],

  plugins: [
    'eslint-plugin-compat',
    'eslint-plugin-jest',
    'eslint-plugin-prettier',
    'eslint-plugin-promise',
    'eslint-plugin-react-hooks',
    'eslint-plugin-import',
    '@typescript-eslint',
    // 'eslint-plugin-jsx-a11y',
    // 'eslint-plugin-security',
    // 'eslint-plugin-unicorn',
  ],

  ignorePatterns: ['build', 'coverage'],

  parserOptions: {
    sourceType: 'module',
    impliedStrict: true,
    project: './tsconfig.json',
  },

  env: {
    es6: true,
    browser: true,
    jest: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
    polyfills: ['Promise', 'Array.from', 'Object.entries'],
    'import/resolver': {
      'babel-module': {},
    },
  },

  rules: {
    // eslint
    'no-param-reassign': 'error',

    // eslint-plugin-react
    'react/no-unescaped-entities': 'off',

    // eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',

    // eslint-plugin-prettier
    'prettier/prettier': 'error',

    // eslint-plugin-compat
    'compat/compat': 'error',

    // eslint-plugin-import
    'import/no-unused-modules': ['error', { unusedExports: true }],

    // eslint-plugin-eslint-comments
    'eslint-comments/no-unused-disable': 'error',

    // @typescript-eslint
    // TODO: Enable these
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
