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
export type IProfileAction = UpdateConnectedProfileAction // oou TotoAction | djfkdjAction |...;

export interface IProfileState {
  connectedProfile?: IProfile;
}

