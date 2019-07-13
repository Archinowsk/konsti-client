/* @flow */
import { submitGetResults } from 'views/results/resultsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitGetGroup } from 'views/group/groupActions'
import { submitLogin } from 'views/login/loginActions'

export const loadData = async (store: Object): Promise<any> => {
  const state = store.getState()

  const { loggedIn, userGroup, groupCode, username, jwt } = state.login
  const { startTime } = state.admin

  // Get settings data
  await store.dispatch(submitGetSettings())

  // Get games data
  await store.dispatch(submitGetGames())

  if (!loggedIn && jwt) {
    await store.dispatch(submitLogin({ jwt }))
  }

  if (loggedIn) {
    // Get results data
    if (startTime) {
      await store.dispatch(submitGetResults(startTime))
    }

    // Get user data
    if (userGroup === 'user') {
      await store.dispatch(submitGetUser(username))
    }

    // Get group members
    if (groupCode !== '0') {
      await store.dispatch(submitGetGroup(groupCode))
    }
  }
}
