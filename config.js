const config = {};

// App info
config.appName = 'Ropecon RPG Signup';

// Variables for production environment
if (process.env.NODE_ENV === 'production') {
  config.env = 'production';
  config.apiServerURL = 'https://konsti.azurewebsites.net';
}

// Variables for development environment
if (process.env.NODE_ENV === 'development') {
  config.env = 'development';
  config.apiServerURL = 'http://localhost:3000';
}

module.exports = config;
