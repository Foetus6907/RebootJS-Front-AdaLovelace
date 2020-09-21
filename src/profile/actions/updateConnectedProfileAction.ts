import {IProfile, UPDATE_CONNECTED_PROFILE, UpdateConnectedProfileAction} from "../types";


export function updateConnectedProfileAction(profile: IProfile): UpdateConnectedProfileAction {
	return {
		type: UPDATE_CONNECTED_PROFILE,
		profile: profile
	}
}

//////////// Plus tard, dans mon composant
// dispatch(updateConnectedProfileAction(loggedUser))
