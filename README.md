# konsti-client

[![Known Vulnerabilities](https://snyk.io/test/github/archinowsk/konsti-client/badge.svg)](https://snyk.io/test/github/archinowsk/konsti-client)

Konsti is a signup tool. Registered users can choose weighted preferences (i.e. option 1, option 2, option 3) and signup slots are quickly allocated using [Hungarian algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm).

Konsti is designed for the role-playing convention [Ropecon](https://ropecon.fi). It was used in Ropecon 2017 by ~500 users to sign up for [tabletop role-playing games](https://en.wikipedia.org/wiki/Tabletop_role-playing_game). Second version will be out for Ropecon 2018. Configs are done into the code at the moment, but more general configurable version will be available in the future.

Supported features:

* Admins
  * Fetch game data from JSON source
  * Hide selected games
  * Toggle signup open for a time slot
  * Run the allocation algorithm
* Users
  * Registration with a pre-generated serial key
  * Browse game details and toggle favorites
  * Sign up to games by choosing 1-3 options
  * See the signup data once the allocation algorithm is run

Tech:

* Back-end (see [konsti-server](https://github.com/Archinowsk/konsti-server))
  * Node.js
  * Express
  * Azure App Service
  * MongoDB / Cosmos DB
* Front-end
  * React
  * Redux
  * ES6
  * Webpack
  
Development Suppported By

<a href="https://www.sovellin.com/"><img src="https://github.com/Archinowsk/archinowsk.github.io/blob/master/assets/sovellin-logo.svg" height="40"></a>

<a href="https://www.browserstack.com/"><img src="https://github.com/Archinowsk/archinowsk.github.io/blob/master/assets/browserstack-logo.svg" height="40"></a>

