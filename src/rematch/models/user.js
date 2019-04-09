import * as api from '../../utils/api';
import localStorage from '../../utils/localStorage';
import * as localStoreKey from '../../configs/localStoreKey';
import { navigate } from '@reach/router/lib/history';

const user = {
  state: {
    id: '',
    nickname: '',
    token: '',
    location: ''
  },
  reducers: {
    setUser(state, payload) {
      return {
        ...state,
        ...payload
      };
    },
    updateUserLocation(state, payload) {
      return {
        ...state,
        location: payload
      };
    }
  },
  effects: dispatch => ({
    doLoginAndCacheUser(payload, rootState) {
      api
        .doLogin(payload)
        .then(({ token, city, nickname, id }) => {
          localStorage.setItem(localStoreKey.TOKEN_KEY, token);
          localStorage.setItem(localStoreKey.CITY_KEY, city);
          localStorage.setItem(localStoreKey.USER_KEY, nickname);
          dispatch({
            type: 'user/setUser',
            payload: {
              location: city,
              nickname,
              token,
              id
            }
          });
        })
        .then(() => {
          const history = window.history;
          if (history.length) {
            history.go(-1);
          } else {
            navigate('/user');
          }
        })
        .catch(e => {
          window.alert(e);
        });
    },
    loadUserFromCache(payload, rootState) {
      const nickname = localStorage.getItem(localStoreKey.USER_KEY);
      const token = localStorage.getItem(localStoreKey.TOKEN_KEY);
      const location = localStorage.getItem(localStoreKey.CITY_KEY);
      if (nickname) {
        dispatch({
          type: 'user/setUser',
          payload: {
            nickname,
            token,
            location
          }
        });
      }
    },
    async asyncUpdateUserLocation(payload, rootState) {
      const user = rootState.user;
      if (!!user.token) {
        await api.updateUserLocation(payload).catch(e => {
          window.alert('Update user location failed!');
          console.log(e);
        });
      }
      localStorage.setItem(localStoreKey.CITY_KEY, payload);
      dispatch({
        type: 'user/updateUserLocation',
        payload
      });
    }
  })
};

export default user;
