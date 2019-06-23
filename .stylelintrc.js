module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'error',
        ignore: ['flexbox'],
      },
    ],
  },
}
