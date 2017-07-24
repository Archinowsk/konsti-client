import axios from 'axios';
import config from '../../config';
import store from './store';

const getAuthToken = () => {
  const state = store.getState();
  const jwtToken = state.login.jwtToken;

  const authHeader = {
    headers: { Authorization: `bearer ${jwtToken}` },
  };

  return authHeader;
  /*
  function select(state) {
    return state.login.jwtToken;
  }

  // let authHeader = {};

  function listener() {
    const token = select(store.getState());
    axios.defaults.headers.common['Authorization'] = token;
    console.log('token');
    console.log(token);


    authHeader = {
      headers: { Authorization: `bearer ${token}` },
    };

  }

  // store.subscribe(listener);

  // return authHeader;

  // console.log('authHeader');
  // console.log(authHeader);
  */
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
  const authHeader = getAuthToken();
  return api.post('/games', {}, authHeader).then(
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

export const postPlayersAssign = () =>
  api.post('/players').then(
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

export const getUser = username =>
  api
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

export const postSignup = signupData =>
  api.post('/signup', { signupData }).then(
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

export const postFavorite = favoriteData =>
  api.post('/favorite', { favoriteData }).then(
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
