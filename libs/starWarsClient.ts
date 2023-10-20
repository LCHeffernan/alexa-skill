 import axios, { Axios } from 'axios';

 export const starWarsClient: Axios = axios.create({
    baseURL: "https://swapi.dev/api/",
    timeout: 3000,
  });
