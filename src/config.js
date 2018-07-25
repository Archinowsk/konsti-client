const config = {}

// App info
config.appName = 'Konsti'

// App status
config.staging = process.env.STAGING || false

// App settings
config.appOpen = true
config.SIGNUP_END_TIME = 30 // minutes
config.SIGNUP_OPEN_TIME = 4 // hours
config.MESSAGE_DELAY = 2000 // ms

// TODO: Move to admin view
config.CONVENTION_START_TIME = '2018-07-27T12:00:00Z' // UTC date
config.DAY_START_TIME = 8 // 08:00

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
