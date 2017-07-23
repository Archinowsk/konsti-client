import axios from 'axios';
import config from '../../config';

const apiServerURL = config.apiServerURL;

export const api = axios.create({
  baseURL: `${apiServerURL}/api`,
  timeout: 10000, // 10s
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

export const postGamesUpdate = () =>
  api.post('/games').then(
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
