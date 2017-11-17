import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_FAILURE,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  FETCH_CREDITS_REQUEST,
  FETCH_CREDITS_SUCCESS,
  FETCH_CREDITS_FAILURE,
  CLEAR_SEARCH,
  ADD_FAVORITES,
} from './constants';
import { CALL_API } from '../middlewares/apiMiddleware';

export const fetchMovies = (query) => ({
  [CALL_API]: {
    types: [FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE],
    query
  }
});

export const emptySearchedMovies = () => ({
  type: CLEAR_SEARCH
});

export const addToFavourites = (movie) => ({
  type: ADD_FAVORITES,
  movie
});

export const fetchMoviesGenres = (endpoint) => ({
  [CALL_API]: {
    types: [FETCH_GENRES_REQUEST, FETCH_GENRES_SUCCESS, FETCH_GENRES_FAILURE],
    endpoint
  }
});

export const fetchMovieCredits = (endpoint) => ({
  [CALL_API]: {
    types: [FETCH_CREDITS_REQUEST, FETCH_CREDITS_SUCCESS, FETCH_CREDITS_FAILURE],
    endpoint
  }
});
