const postcssPresetEnv = require('postcss-preset-env')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const autoprefixer = require('autoprefixer')

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    postcssPresetEnv,
    postcssFlexbugsFixes,
    autoprefixer, // Call autoprefixer last
  ],
}
