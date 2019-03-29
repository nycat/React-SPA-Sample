import axios from 'axios';
import * as localStoreKey from '../configs/localStoreKey';
import localStorage from './localStorage';
import { API_BASE } from '../configs';
import { Base64 } from 'js-base64';

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
  return config;
});

axios.interceptors.response.use(
  response => {
    const { data } = response;
    if (data) {
      return data;
    } else {
      return response;
    }
  },
  error => {
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
