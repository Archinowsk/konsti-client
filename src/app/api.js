import axios from 'axios';
import config from '../../config';
import store from './store';

const setAuthToken = () => {
  const state = store.getState();
  const jwtToken = state.login.jwtToken;

  axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
};

const apiServerURL = config.apiServerURL;

export const api = axios.create({
  baseURL: `${apiServerURL}/api`,
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postLogin = loginData =>
  api.post('/login', { loginData }).then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );

export const postRegistration = registrationData =>
  api.post('/user', { registrationData }).then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );

export const postGamesUpdate = () => {
  setAuthToken();
  return api.post('/games').then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );
};

export const postPlayersAssign = () => {
  setAuthToken();
  // const startingTime = getNextStartingTime();
  return api
    .post('/players', { startingTime: '2016-07-30 20:00:00.000Z' })
    .then(
      response => {
        if (response.status !== 200 || !response.data) {
          console.log('Response status !== 200, reject');
          return Promise.reject(response);
        }
        return response.data;
      },
      error => {
        if (error.message === 'Network Error') {
          console.log('Network error: no connection to server');
        } else {
          console.log(error);
        }
      }
    );
};
export const getGames = () =>
  api.get('/games').then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );

export const getUser = username => {
  setAuthToken();
  return api
    .get('/user', {
      params: {
        username,
      },
    })
    .then(
      response => {
        if (response.status !== 200 || !response.data) {
          console.log('Response status !== 200, reject');
          return Promise.reject(response);
        }
        return response.data;
      },
      error => {
        if (error.message === 'Network Error') {
          console.log('Network error: no connection to server');
        } else {
          console.log(error);
        }
      }
    );
};

export const getSettings = () => {
  setAuthToken();
  return api.get('/settings').then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );
};

export const postSignup = signupData => {
  setAuthToken();
  return api.post('/signup', { signupData }).then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );
};

export const postFavorite = favoriteData => {
  setAuthToken();
  return api.post('/favorite', { favoriteData }).then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );
};

export const postBlacklist = blacklistData => {
  setAuthToken();
  return api.post('/blacklist', { blacklistData }).then(
    response => {
      if (response.status !== 200 || !response.data) {
        console.log('Response status !== 200, reject');
        return Promise.reject(response);
      }
      return response.data;
    },
    error => {
      if (error.message === 'Network Error') {
        console.log('Network error: no connection to server');
      } else {
        console.log(error);
      }
    }
  );
};
