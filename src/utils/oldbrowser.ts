import outdatedBrowserRework from 'outdated-browser-rework';
import 'outdated-browser-rework/dist/style.css';

// This is not used at the moment
// Old browser check can be enabled from webpack config

const browserSupport = {
  Chrome: 40, // Includes Chrome for mobile devices
  Edge: 39,
  Safari: 10,
  'Mobile Safari': 10,
  Firefox: 50,
  Opera: 50,
  Vivaldi: 1,
  IE: false,
};

outdatedBrowserRework({
  browserSupport,
  fullscreen: true, // Show full screen warning
  requireChromeOnAndroid: true, // Ask Android users to install Chrome
  isUnknownBrowserOK: false, // Unknown browsers are considered to be out of date
});
