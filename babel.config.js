module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        debug: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
  },
}
