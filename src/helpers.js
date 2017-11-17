import _ from 'underscore';

export const debouncedSearch = _.debounce((query, func) => {
  func(query);
}, 300);

export const objectifyArray = (arr) => (arr.reduce((accum, scoot) => {
  accum[scoot.id] = scoot;
  return accum;
}, {}));
