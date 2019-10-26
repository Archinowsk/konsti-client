// @flow
import { submitGetResults } from 'views/results/resultsActions';
import { submitGetGames } from 'views/all-games/allGamesActions';
import { submitGetSettings } from 'views/admin/adminActions';
import { submitGetUser } from 'views/my-games/myGamesActions';
import { submitGetGroup } from 'views/group/groupActions';
import { submitLogin } from 'views/login/loginActions';

export const loadData = async (store: Object): Promise<void> => {
  // Get app settings
  await loadSettings(store);

  // Get games data
  await loadGames(store);

  // Check if existing user session
  await recoverSession(store);

  // Get assignment results
  await loadResults(store);

  // Get user data
  await loadUser(store);

  // Get group members
  await loadGroupMembers(store);
};

export const loadSettings = async (store: Object): Promise<void> => {
  await store.dispatch(submitGetSettings());
};

export const loadGames = async (store: Object): Promise<void> => {
  await store.dispatch(submitGetGames());
};

export const recoverSession = async (store: Object): Promise<void> => {
  const state = store.getState();
  const { loggedIn, jwt } = state.login;

  if (!loggedIn && jwt) {
    await store.dispatch(submitLogin({ jwt }));
  }
};

export const loadResults = async (store: Object): Promise<void> => {
  const state = store.getState();
  const { loggedIn } = state.login;
  const { signupTime } = state.admin;

  if (loggedIn && signupTime) {
    await store.dispatch(submitGetResults(signupTime));
  }
};

export const loadUser = async (store: Object): Promise<void> => {
  const state = store.getState();
  const { loggedIn, userGroup, username } = state.login;

  if (loggedIn && userGroup === 'user') {
    await store.dispatch(submitGetUser(username));
  }
};

export const loadGroupMembers = async (store: Object): Promise<void> => {
  const state = store.getState();
  const { loggedIn, groupCode } = state.login;

  if (loggedIn && groupCode !== '0') {
    await store.dispatch(submitGetGroup(groupCode));
  }
};
