module.exports = {
  extends: [
    'eslint-config-standard',
    'eslint-config-prettier',
    'eslint-config-prettier/flowtype',
    'eslint-config-prettier/react',
    'eslint-config-prettier/standard',
    'plugin:eslint-plugin-eslint-comments/recommended',
    'plugin:eslint-plugin-flowtype/recommended',
    'plugin:eslint-plugin-jest/recommended',
    'plugin:eslint-plugin-promise/recommended',
    'plugin:eslint-plugin-react/recommended',
    // 'plugin:eslint-plugin-jsx-a11y/recommended',
    // 'plugin:eslint-plugin-security/recommended',
    // 'plugin:eslint-plugin-unicorn/recommended',
  ],

  plugins: [
    'eslint-plugin-compat',
    'eslint-plugin-flowtype',
    'eslint-plugin-jest',
    'eslint-plugin-prettier',
    'eslint-plugin-promise',
    'eslint-plugin-react-hooks',
    // 'eslint-plugin-jsx-a11y',
    // 'eslint-plugin-security',
    // 'eslint-plugin-unicorn',
  ],

  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module',
    impliedStrict: true,
  },

  env: {
    es6: true,
    browser: true,
    jest: true,
  },

  settings: {
    react: {
      version: '16.8',
    },
    polyfills: ['Promise', 'Array.from', 'Object.entries'],
    'import/resolver': {
      'babel-module': {},
    },
  },

  rules: {
    // eslint
    'no-unused-expressions': 'off', // False warnings with Flow
    'no-param-reassign': 'error',

    // eslint-plugin-flowtype
    'flowtype/no-unused-expressions': 'error', // Fixed version of no-unused-expressions

    // eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // eslint-plugin-prettier
    'prettier/prettier': 'error',

    // eslint-plugin-compat
    'compat/compat': 'error',

    // eslint-config-standard-react
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true,
      },
    ],
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',

    // eslint-config-standard-jsx
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/self-closing-comp': 'error',

    // eslint-plugin-import
    // Useful but disabled because slows down ESLint
    // 'import/no-unused-modules': ['error', { unusedExports: true }],

    // eslint-plugin-eslint-comments
    'eslint-comments/no-unused-disable': 'error',
  },
}
