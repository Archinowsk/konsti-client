/* @flow */
import { submitGetResults } from 'views/results/resultsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'

export const loadData = async (store: Object) => {
  const state = store.getState()

  // const adminSettingsLoaded = state.admin.adminSettingsLoaded
  // const myGamesLoaded = state.myGames.myGamesLoaded
  const loggedIn = state.login.loggedIn
  const startTime = state.admin.signupTime
  const userGroup = state.login.userGroup

  // Get games data
  await store.dispatch(submitGetGames())

  /*
  if (!adminSettingsLoaded) {
    // Get settings data
    await store.dispatch(submitGetSettings())
  }
  */

  // Get settings data
  await store.dispatch(submitGetSettings())

  if (loggedIn) {
    // Get results data
    if (startTime) {
      await store.dispatch(submitGetResults(startTime))
    }

    // Get user data
    if (userGroup === 'user') {
      const username = state.login.username
      await store.dispatch(submitGetUser(username))
    }
  }
}
