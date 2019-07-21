module.exports = api => {
  api.cache(true)

  const target = process.env.npm_lifecycle_event

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'entry',
        corejs: '3',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ]

  const plugins = [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
      },
    ],
    'babel-plugin-lodash',
  ]

  if (target === 'start') {
    plugins.push(['react-hot-loader/babel'])
  }

  return {
    presets,
    plugins,
  }
}
