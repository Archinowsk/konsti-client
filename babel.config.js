module.exports = api => {
  api.cache(true)

  const target = process.env.npm_lifecycle_event

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        debug: true,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ]

  const plugins = ['@babel/plugin-proposal-class-properties']

  if (target === 'start') {
    plugins.push(['react-hot-loader/babel'])
  }

  return {
    presets,
    plugins,
  }
}
