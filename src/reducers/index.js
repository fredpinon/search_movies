import * as actions from '../actions/constants';
import { objectifyArray, parseForTrailer } from '../helpers';

const initialState = {
  fetching: false,
  searchedMovies: {},
  favourites: {},
  favouritesCount: 0,
  movieGenres: {},
  credits: [],
  error: false,
};

const moviesReducer = (state=initialState, action) => {
  switch (action.type) {
  case actions.FETCH_MOVIES_REQUEST:
    return {
      ...state,
      fetching: true,
    };
  case actions.FETCH_MOVIES_SUCCESS:
    return {
      ...state,
      searchedMovies: {
        ...objectifyArray(action.response.results)
      },
      fetching: false,
      error: false,
    };
  case actions.FETCH_MOVIES_FAILURE:
    return {
      ...state,
      searchedMovies: {},
      fetching: false,
      error: true,
    };
  case actions.CLEAR_SEARCH:
    return {
      ...state,
      searchedMovies: {},
    };
  case actions.ADD_FAVORITES:
    return {
      ...state,
      favourites: {
        ...state.favourites,
        [action.movie.id]: {
          index: state.favouritesCount++,
          ...action.movie
        }
      },
    };
  case actions.FETCH_GENRES_SUCCESS:
    return {
      ...state,
      movieGenres: {
        ...objectifyArray(action.response.genres)
      }
    };
  case actions.FETCH_CREDITS_SUCCESS:
    return {
      ...state,
      credits: {
        cast: action.response.cast,
        crew: action.response.crew,
      }
    };
  }
  return state;
};

export default moviesReducer;
