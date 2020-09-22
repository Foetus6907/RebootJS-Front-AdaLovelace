import {IProfileAction, IProfileState, SET_USERS_LIST, SetUsersListAction, UPDATE_CONNECTED_PROFILE} from "../types";

export function updateConnectedProfilCase(state: IProfileState, action: IProfileAction): IProfileState {
	if (action.type === UPDATE_CONNECTED_PROFILE) {
		return {
			...state,
			connectedProfile: action.profile
		}
	} else {
		return state
	}
}

export function SetUsersListCase(state: IProfileState, action: SetUsersListAction) {
	if (action.type === SET_USERS_LIST) {
		return {
			...state,
			users: action.users
		}
	} else {
		return state
	}
}
