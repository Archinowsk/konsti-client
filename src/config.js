const config = {}

// App info
config.appName = 'Konsti'

// Variables for production environment
if (process.env.NODE_ENV === 'production') {
  config.env = 'production'
  config.apiServerURL =
    'http://awseb-e-x-awsebloa-1hrdkdgbzl6v4-2140903285.eu-west-1.elb.amazonaws.com'
}

// Variables for development environment
if (process.env.NODE_ENV === 'development') {
  config.env = 'development'
  config.apiServerURL = 'http://localhost:3000'
}

module.exports = config
