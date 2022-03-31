import { moviesUrl } from '../constants/moviesUrl';

const fetch = require('node-fetch');

const fetchUrl = function () {
  return fetch(moviesUrl, {
    headers: { Accept: 'application/json' },
  }).then((x) => x.json());
};

export default fetchUrl;
