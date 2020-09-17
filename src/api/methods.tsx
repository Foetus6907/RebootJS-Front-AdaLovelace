import {User} from "../users/types";
import axios from 'axios';
import {IProfile} from "../profile/types";
import {IConversation} from "../conversations/types";

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

export function getConversations(): Promise<IConversation[]>{
  return Promise.resolve([
    {
      _id: 'abcd',
      targets: [
        '5f5b4b1e9f83755dc618f7d6',
        '5f5e7dcd2b8f6a0d6ed53b6a'
      ],
      updatedAt: new Date().toLocaleString(),
      unseenMessages: 0,
      messages: [
        {
          _id: '1',
          conversationId: 'abcd',
          createdAt: new Date().toLocaleString(),
          emitter: '5f5b4b1e9f83755dc618f7d6',
          targets: [
            '5f5e7dcd2b8f6a0d6ed53b6a'
          ],
          content: 'Coucou'
        },
        {
          _id: '2',
          conversationId: 'abcd',
          createdAt: new Date().toLocaleString(),
          emitter: '5f5e7dcd2b8f6a0d6ed53b6a',
          targets: [
            '5f5b4b1e9f83755dc618f7d6'
          ],
          content: 'Hey Comment tu vas ?'
        }
      ]
    },
    {
      _id: 'dcba',
      targets: [
        '5f5b4b1e9f83755dc618f7d6',
        '5f5e7dcd2b8f6a0d6ed53b6a'
      ],
      updatedAt: new Date().toLocaleString(),
      unseenMessages: 0,
      messages: [
        {
          _id: '1',
          conversationId: 'abcd',
          createdAt: new Date().toLocaleString(),
          emitter: '5f5b4b1e9f83755dc618f7d6',
          targets: [
            '5f5e7dcd2b8f6a0d6ed53b6a'
          ],
          content: 'Hello you'
        },
        {
          _id: '2',
          conversationId: 'abcd',
          createdAt: new Date().toLocaleString(),
          emitter: '5f5e7dcd2b8f6a0d6ed53b6a',
          targets: [
            '5f5b4b1e9f83755dc618f7d6'
          ],
          content: 'Hi how are you ?'
        }
      ]
    }
  ])
}
