module.exports = {
  plugins: ['stylelint-no-unsupported-browser-features'],

  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-a11y/recommended',
  ],

  ignoreFiles: ['build/**/*', 'coverage/**/*'],

  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'error',
        ignore: ['flexbox', 'css3-cursors-newer', 'css-resize'],
      },
    ],
  },
};
