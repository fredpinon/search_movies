const callApi = (query, endpoint) => {
  const fullUrl = query ?
    'https://api.themoviedb.org/3/search/movie'+
    `?api_key=433998122abdf5765a71e48d5b8571ef&query=${query}&language=en-US&include_adult=false`
    :
    `https://api.themoviedb.org/3${endpoint}?api_key=433998122abdf5765a71e48d5b8571ef&language=en-US`;

  return fetch(fullUrl)
    .then(response => response.json());
};

export const CALL_API = 'Call API';

export default store => next => action => {

  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') return next(action);

  const { types, query, endpoint } = callAPI;
  const [ requestType, successType, failureType ] = types;

  next({type: requestType});

  return callApi(query, endpoint)
    .then(response => {
      next({
        type: successType,
        response
      });
    })
    .catch(error => {
      next({
        type: failureType,
        error
      });
    });
};
