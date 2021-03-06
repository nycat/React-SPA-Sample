import { init } from '@rematch/core';
import models from './models';

const store = init({
  models
});

store.dispatch({
  type: 'app/fetchHotCities'
});

store.dispatch({
  type: 'user/loadUserFromCache'
});

export default store;
