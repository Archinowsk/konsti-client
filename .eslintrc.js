module.exports = {
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'plugin:promise/recommended',
    // 'plugin:security/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:unicorn/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:eslint-plugin/recommended',
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
    'eslint-plugin',
    'react-hooks',
    'jest',
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
    // eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',

    // eslint-plugin-prettier
    'prettier/prettier': 'error',

    // "eslint-plugin-compat
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
    'import/no-unused-modules': ['error', { unusedExports: true }],
  },
}
