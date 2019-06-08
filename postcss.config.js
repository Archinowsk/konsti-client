const postcssPresetEnv = require('postcss-preset-env')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const precss = require('precss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    postcssImport,
    precss,
    postcssPresetEnv,
    postcssFlexbugsFixes,
    autoprefixer,
    cssnano,
  ],
}
