import * as api from '../../utils/api';

const app = {
  state: {
    ajaxSpinner: false,
    location: '',
    hotCities: []
  },
  reducers: {
    setAjaxSpinner(state, payload) {
      return {
        ...state,
        ajaxSpinner: payload
      };
    },
    setLocation(state, payload) {
      return {
        ...state,
        location: payload
      };
    },
    setHotCities(state, payload) {
      return {
        ...state,
        hotCities: payload
      };
    }
  },
  effects: dispatch => ({
    fetchHotCities(payload, rootState) {
      api
        .fetchHotCities()
        .then(({ data, meta }) => {
          dispatch({
            type: 'app/setHotCities',
            payload: data
          });
        })
        .catch(e => {
          console.log(e);
          window.alert('Fetch hot cities data failed!');
        });
    }
  })
};

export default app;
