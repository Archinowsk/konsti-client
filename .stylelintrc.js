module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    indentation: [2, { severity: 'warning' }], // Specify indentation
    'at-rule-empty-line-before': ['always', { severity: 'warning' }], // Require or disallow an empty line before at-rules
    'color-hex-length': 'long', // Specify short or long notation for hex colors
    'shorthand-property-no-redundant-values': null, // Disallow redundant values in shorthand properties
  },
};
