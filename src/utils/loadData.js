/* @flow */
import { submitGetResults } from 'views/all-signups/allSignupsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'

const loadData = async (store: Object) => {
  const state = store.getState()

  const adminSettingsLoaded = state.admin.adminSettingsLoaded
  const myGamesLoaded = state.myGames.myGamesLoaded
  const loggedIn = state.login.loggedIn

  await store.dispatch(submitGetGames())

  if (!adminSettingsLoaded) {
    await store.dispatch(submitGetSettings())
  }

  if (!myGamesLoaded) {
    await store.dispatch(submitGetResults())
  }

  if (loggedIn) {
    const username = state.login.username
    await store.dispatch(submitGetUser(username))
  }
}

export default loadData
