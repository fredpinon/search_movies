import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducer from './reducers';
import apiMiddleware from './middlewares/apiMiddleware';

const configureStore = () => (createStore(
  reducer,
  applyMiddleware(apiMiddleware, logger)
));

export default configureStore;
