import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../containers/Home';
import MovieDetails from '../containers/MovieDetails';
import Credits from './Credits';

const Router = StackNavigator({
  Home: {
    screen: Home,
  },
  MovieDetails: {
    screen: MovieDetails
  },
  Credits: {
    screen: Credits
  }
});

export default Router;
