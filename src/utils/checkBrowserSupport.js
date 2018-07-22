import browserslist from 'browserslist'
import bowser from 'bowser'

const checkBrowserSupport = () => {
  const supportedBrowsers = browserslist()
  console.log(supportedBrowsers)

  const currentBrowser = bowser.getParser(window.navigator.userAgent)
  console.log(currentBrowser)

  /*
  // TODO: Check if current browser is in supported browsers list
  // TODO: Map Browserslist values to Bowser values
  if (currentBrowser === supportedBrowsers) {
    // Continue
  }
  */
}

export default checkBrowserSupport
