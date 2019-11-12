const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const precss = require('precss');
const cssnano = require('cssnano');
const postcssNormalize = require('postcss-normalize');
const postcssComments = require('postcss-comment');

module.exports = {
  parser: postcssComments,

  plugins: [
    postcssImport,
    precss,
    postcssPresetEnv,
    postcssNormalize,
    postcssFlexbugsFixes,
    autoprefixer,
    cssnano,
  ],
};
