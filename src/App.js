import React, { Component } from 'react';
import { Provider } from 'react-redux';

import RouterMap from './routes';
import store from './rematch/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterMap />
      </Provider>
    );
  }
}

export default App;
