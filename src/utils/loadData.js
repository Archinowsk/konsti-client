/* @flow */
import { submitGetResults } from 'views/results/resultsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitGetGroup } from 'views/group/groupActions'

export const loadData = async (store: Object) => {
  const state = store.getState()

  const { loggedIn, userGroup, groupCode, username, jwt } = state.login
  const { startTime } = state.admin

  // Get games data
  await store.dispatch(submitGetGames())

  // Get settings data
  await store.dispatch(submitGetSettings())

  if (!loggedIn && jwt) {
    console.log('restore session')
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
