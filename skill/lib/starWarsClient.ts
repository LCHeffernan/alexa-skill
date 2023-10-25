import axios from 'axios';

export const createStarWarsClient = () => {
  return axios.create({
    baseURL: 'https://swapi.dev/api',
    timeout: 3000,
  });
};
