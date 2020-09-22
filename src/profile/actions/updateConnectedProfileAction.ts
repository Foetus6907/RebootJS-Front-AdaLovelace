import {
	IProfile, SET_NEW_USERS,
	SET_USERS_LIST, SetNewUsersAction,
	SetUsersListAction,
	UPDATE_CONNECTED_PROFILE,
	UpdateConnectedProfileAction
} from "../types";
import {User} from "../../users/types";


export function updateConnectedProfileAction(profile: IProfile): UpdateConnectedProfileAction {
	return {
		type: UPDATE_CONNECTED_PROFILE,
		profile: profile
	}
}
//////////// Plus tard, dans mon composant
// dispatch(updateConnectedProfileAction(loggedUser))

export function setUsersListAction(users: User[]): SetUsersListAction {
	return {
		type: SET_USERS_LIST,
		users: users
	}
}

export function setNewUsersAction(newUsers: User[]): SetNewUsersAction {
	return {
		type: SET_NEW_USERS,
		newUsers: newUsers
	}
}
