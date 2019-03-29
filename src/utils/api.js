import axios from 'axios';
import * as localStoreKey from '../configs/localStoreKey';
import localStorage from './localStorage';
import { API_BASE } from '../configs';
import { Base64 } from 'js-base64';
import store from '../rematch';

axios.defaults.baseURL = API_BASE;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.timeout = 2500;

axios.interceptors.request.use(config => {
  const { url, method } = config;
  if (!(url === 'user' && method === 'post')) {
    const token = localStorage.getItem(localStoreKey.TOKEN_KEY);
    config.headers.Authorization = token;
  }
  store.dispatch({
    type: 'app/setAjaxSpinner',
    payload: true
  });
  return config;
});

axios.interceptors.response.use(
  response => {
    store.dispatch({
      type: 'app/setAjaxSpinner',
      payload: false
    });
    const { data } = response;
    if (data) {
      return data;
    } else {
      return response;
    }
  },
  error => {
    store.dispatch({
      type: 'app/setAjaxSpinner',
      payload: false
    });
    Promise.reject(error);
  }
);

export const doLogin = ({ account, password }) => {
  const token = Base64.encode(`${account}:${password}`);
  return axios.post(
    '/user',
    {},
    {
      headers: {
        authorization: token
      }
    }
  );
};

export const fetchHotCities = () => {
  return axios.get('/city');
};
