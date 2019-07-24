/* @flow */
import { submitGetResults } from 'views/results/resultsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitGetGroup } from 'views/group/groupActions'
import { submitLogin } from 'views/login/loginActions'

export const loadData = async (store: Object): Promise<void> => {
  // Get app settings
  await loadSettings(store)

  // Get games data
  await loadGames(store)

  // Check if existing user session
  await recoverSession(store)

  // Get assignment results
  await loadResults(store)

  // Get user data
  await loadUser(store)

  // Get group members
  await loadGroupMembers(store)
}

const loadSettings = async (store): Promise<void> => {
  await store.dispatch(submitGetSettings())
}

const loadGames = async (store): Promise<void> => {
  await store.dispatch(submitGetGames())
}

const recoverSession = async (store): Promise<void> => {
  const state = store.getState()
  const { loggedIn, jwt } = state.login

  if (!loggedIn && jwt) {
    await store.dispatch(submitLogin({ jwt }))
  }
}

const loadResults = async (store): Promise<void> => {
  const state = store.getState()
  const { loggedIn } = state.login
  const { startTime } = state.admin

  if (loggedIn && startTime) {
    await store.dispatch(submitGetResults(startTime))
  }
}

const loadUser = async (store): Promise<void> => {
  const state = store.getState()
  const { loggedIn, userGroup, username } = state.login

  if (loggedIn && userGroup === 'user') {
    await store.dispatch(submitGetUser(username))
  }
}

const loadGroupMembers = async (store): Promise<void> => {
  const state = store.getState()
  const { loggedIn, groupCode } = state.login

  if (loggedIn && groupCode !== '0') {
    await store.dispatch(submitGetGroup(groupCode))
  }
}
