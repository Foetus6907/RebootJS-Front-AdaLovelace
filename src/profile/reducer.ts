import {setNewUsersCase, SetUsersListCase, updateConnectedProfilCase} from "./cases/updateConnectedProfileCase";
import {IProfileAction, IProfileState, SET_NEW_USERS, SET_USERS_LIST, UPDATE_CONNECTED_PROFILE} from "./types";

function defaultProfileState(): IProfileState {
	return {newUsers: [], users: []};
}



export function profil(state: IProfileState = defaultProfileState(), action: IProfileAction): IProfileState {
	switch (action.type) {
		case UPDATE_CONNECTED_PROFILE:
			return updateConnectedProfilCase(state, action)
		case SET_USERS_LIST:
			return SetUsersListCase(state, action)
		case SET_NEW_USERS:
			return setNewUsersCase(state, action)
		default:
			return state;

	}
}
