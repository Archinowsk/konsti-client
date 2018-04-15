module.exports = {
  plugins: [
    /*
    require('postcss-autoreset')({
      // reset: 'initial',
      reset: {
        // margin: 0,
        // padding: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
      },
    }),
    */

    require('postcss-flexbugs-fixes'),

    // require('postcss-normalize'),

    // Call autoprefixer last
    require('autoprefixer'),
  ],
}
