import axios from 'axios';
import { API_URL } from '../../../utils/api.js'

let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      // mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const response = await axios({
      method: 'POST',
      url: API_URL + '/api/login',
      data: {
        email: payload.email,
        password: payload.password
      }
    })

    const responseData = await response.data;

    if (response.status != 200) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    // expire login dalam 1 jam
    const expiresIn = responseData.expires_in * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('api_token', responseData.access_token);
    localStorage.setItem('roles', responseData.roles);
    localStorage.setItem('tokenExpiration', expirationDate);
    localStorage.setItem('idUnitKerja', responseData.unitkerja);
    localStorage.setItem('level', responseData.level);
    localStorage.setItem('name', responseData.name);
    localStorage.setItem('namaUnit', responseData.namaunitkerja);


    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.access_token,
      roles: responseData.roles
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('api_token');
    const roles = localStorage.getItem('roles');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      context.dispatch('logout');
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token) {
      context.commit('setUser', {
        token,
        roles
      });
    }
  },

  logout(context) {
    localStorage.removeItem('api_token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('idUnitKerja');
    localStorage.removeItem('level');
    localStorage.removeItem('name');
    localStorage.removeItem('roles');
    localStorage.removeItem('namaUnit');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      roles: null
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
