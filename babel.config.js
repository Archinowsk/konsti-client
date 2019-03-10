module.exports = api => {
  api.cache(true)

  const target = process.env.npm_lifecycle_event

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        // modules: false,
        // "useBuiltIns" disabled because auto polyfilling is broken
        // useBuiltIns: 'entry',
        // Ignore browserslist for the same reason
        ignoreBrowserslistConfig: true,
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
  ]

  if (target === 'start') {
    plugins.push(['react-hot-loader/babel'])
  }

  return {
    presets,
    plugins,
  }
}
