const postcssPresetEnv = require('postcss-preset-env')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const autoprefixer = require('autoprefixer')
const postcssAutoreset = require('postcss-autoreset')
const postcssNormalize = require('postcss-normalize')

const autoresetConfig = {
  reset: 'initial',
  reset: {
    margin: 0,
    padding: 0,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
}

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    postcssPresetEnv,
    postcssFlexbugsFixes,
    // postcssAutoreset(autoresetConfig),
    // postcssNormalize,
    autoprefixer, // Call autoprefixer last
  ],
}
