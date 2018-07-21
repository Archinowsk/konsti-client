import outdatedBrowserRework from 'outdated-browser-rework'
import 'outdated-browser-rework/style.scss'

const browserSupport = {
  Chrome: 50, // Includes Chrome for mobile devices
  Edge: 39,
  Safari: 10,
  'Mobile Safari': 10,
  Firefox: 50,
  Opera: 50,
  Vivaldi: 1,
  IE: false,
}

outdatedBrowserRework({
  browserSupport,
  requireChromeOnAndroid: true,
  isUnknownBrowserOK: false,
})