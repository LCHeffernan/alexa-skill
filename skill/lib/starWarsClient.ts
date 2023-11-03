import axios from 'axios';

export const starWarsClient = () => {
  return axios.create({
    baseURL: 'https://swapi.dev/api',
    timeout: 3000,
  });
};
