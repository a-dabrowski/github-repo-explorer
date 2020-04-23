import axios from "axios";
const API_URL = 'https://api.github.com'

export interface iFetchedUser {
  login: string,
  repos_url: string,
  id: number
}

export const findUser = (query: string) => {
  return axios.get(`${API_URL}/search/users`, {params: {q: query + ' in:login'}}).then(response => {
    return response;
  });
};

export const fetchUserRepos = (userLogin: string) => {
  return axios.get(userLogin).then(response => {
    return response;
  });
};
