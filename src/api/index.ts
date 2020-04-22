import axios from "axios";
const API_URL = 'https://api.github.com'

export const findUser = (query: string) => {
  return axios.get(`${API_URL}/search/users`, {params: {q: query + ' in:login'}}).then(response => {
    return response;
  });
};
