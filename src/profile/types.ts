export interface IProfile {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  conversationSeen: {[conversationId: string] : string};
}

// --- Définition des types de l'actions ---
export const UPDATE_CONNECTED_PROFILE = 'UPDATE_CONNECTED_PROFILE';
export interface UpdateConnectedProfileAction {
  type: typeof UPDATE_CONNECTED_PROFILE,
  profile: IProfile
}
// ---

export const SET_USERS_LIST = "SET_USERS_LIST";
export interface SetUsersListAction {
  type: typeof SET_USERS_LIST,
  users: IProfile[]
}
export const SET_NEW_USERS ="SET_NEW_USERS"
export interface SetNewUsersAction {
  type: typeof SET_NEW_USERS,
  newUsers: IProfile[]
}


export type IProfileAction = UpdateConnectedProfileAction | SetUsersListAction | SetNewUsersAction // oou TotoAction | djfkdjAction |...;

export interface IProfileState {
  connectedProfile?: IProfile;
  users: IProfile[];
  newUsers: IProfile[]
}

