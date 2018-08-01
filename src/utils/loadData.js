/* @flow */
import { submitGetResults } from 'views/all-signups/allSignupsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitSelectedGames } from 'views/signup/signupActions'

const loadData = async (store: Object) => {
  const state = store.getState()

  // const adminSettingsLoaded = state.admin.adminSettingsLoaded
  // const myGamesLoaded = state.myGames.myGamesLoaded
  const loggedIn = state.login.loggedIn

  // Get games data
  await store.dispatch(submitGetGames())

  /*
  if (!adminSettingsLoaded) {
    // Get settings data
    await store.dispatch(submitGetSettings())
  }
  */

  if (loggedIn) {
    // Get settings data
    await store.dispatch(submitGetSettings())

    // Get results data
    await store.dispatch(submitGetResults())

    // Get user data
    const username = state.login.username
    await store.dispatch(submitGetUser(username))

    // Set selected games
    const selectedGames = store.getState().myGames.signedGames
    await store.dispatch(submitSelectedGames(selectedGames))
  }
}

export default loadData
