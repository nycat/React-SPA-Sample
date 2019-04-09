import axios from 'axios';
import * as localStoreKey from '../configs/localStoreKey';
import localStorage from './localStorage';
import { API_BASE } from '../configs';
import { Base64 } from 'js-base64';
import store from '../rematch';
import * as helpers from './helpers';
import { navigate } from '@reach/router';

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
  async error => {
    store.dispatch({
      type: 'app/setAjaxSpinner',
      payload: false
    });
    const { response } = error;
    if (response.status === 403) {
      window.alert(response.data && response.data.msg);
      await navigate('/login');
      return;
    }

    if (response && response.data) {
      return Promise.reject(response.data);
    } else {
      return Promise.reject(response || error);
    }
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

export const updateUserLocation = city => {
  return axios.post('/user/city', {
    city
  });
};

export const fetchMerchantInfo = merchantId => {
  return axios.get(`/merchant/${merchantId}`);
};

export const fetchUserOrders = query => {
  const queryUrl = helpers.serialize(query);
  return axios.get(`/order?${queryUrl}`);
};

export const fetchMerchants = query => {
  const queryUrl = helpers.serialize(query);
  return axios.get(`/merchants?${queryUrl}`);
};

export const fetchMerchantComments = (merchantId, query) => {
  const queryUrl = helpers.serialize(query);
  return axios.get(`/merchant/${merchantId}/comments?${queryUrl}`);
};

export const reviewOrder = (orderId, review) => {
  return axios.patch(`/order/${orderId}`, {
    comment: review.comment,
    star: review.star
  });
};

export const placeOrder = ({ merchantId, amount }) => {
  return axios.post('/order', {
    merchantId,
    amount
  });
};

export const addTofavoriate = merchantId => {
  return axios.post('/favoriate', {
    merchantId
  });
};
