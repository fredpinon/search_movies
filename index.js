import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Router from './src/components/Router';
import configureStore from './src/configureStore';

const store = configureStore();

const rnredux = () => (
  <Provider store={store}>
    <Router/>
  </Provider>
);

AppRegistry.registerComponent('search_movies', () => rnredux);
