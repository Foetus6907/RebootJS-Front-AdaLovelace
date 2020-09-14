import {User} from "../users/types";
import axios from 'axios';
import {IProfile} from "../profile/types";

// fetch users via the server
export function getUsers(): Promise<User[]> {
  return axios.get(`${process.env.REACT_APP_BACKEND}/profil`, {withCredentials: true})
    .then(resp => {
      return resp.data
    })
}

export function getConnectedProfile(): Promise<User> {
  return axios.get( `${process.env.REACT_APP_BACKEND}/profil/me`, { withCredentials: true })
    .then(resp => resp.data)
}

export function deleteProfil(): Promise<Boolean> {
  return axios.delete( `${process.env.REACT_APP_BACKEND}/profil`, {withCredentials: true})
    .then(resp => {
     return resp.status === 200;
    })
    .catch(err => {
      console.log('Error deleting profile', err)
      return false
    })
}

export function login(email: string, password: string): Promise<IProfile> {
  return axios
    .post(
      `${process.env.REACT_APP_BACKEND}/login`,
      {
        username: email,
        password: password
      },
      {
        withCredentials: true
      }
    )
    .then(resp => resp.data)
}

export function register(email: string, password: string, firstname: string, lastname: string): Promise<IProfile> {
  return axios.post(`${process.env.REACT_APP_BACKEND}/profil`, {email, password, firstname, lastname})
    .then((resp) => resp.data);
}