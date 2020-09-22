import {
	IProfileAction,
	IProfileState,
	SET_NEW_USERS,
	SET_USERS_LIST,
	SetNewUsersAction,
	SetUsersListAction,
	UPDATE_CONNECTED_PROFILE
} from "../types";

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

export function setNewUsersCase(state: IProfileState, action: SetNewUsersAction) {
	if (action.type === SET_NEW_USERS) {
		return {
			...state,
			newUsers: action.newUsers
		}
	} else {
		return state
	}
}
