const config = {}

// App info
config.appName = 'Konsti'

// App status
config.appOpen = false

// Variables for production environment
if (process.env.NODE_ENV === 'production') {
  config.env = 'production'
  config.apiServerURL = 'https://konsti.ropecon.fi'
}

// Variables for development environment
if (process.env.NODE_ENV === 'development') {
  config.env = 'development'
  config.apiServerURL = 'http://localhost:3000'
}

module.exports = config
