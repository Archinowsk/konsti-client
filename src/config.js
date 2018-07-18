const config = {}

// App info
config.appName = 'Konsti'

// App status
config.appOpen = true
config.SIGNUP_END_TIME = 30 // minutes

// Variables for production environment
if (process.env.NODE_ENV === 'production') {
  config.env = 'production'
  config.apiServerURL = process.env.API_SERVER_URL
}

// Variables for development environment
else if (process.env.NODE_ENV === 'development') {
  config.env = 'development'
  config.apiServerURL = 'http://localhost:3000'
}

module.exports = config
