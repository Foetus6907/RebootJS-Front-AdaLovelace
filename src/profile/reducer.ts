import {updateConnectedProfilCase} from "./cases/updateConnectedProfileCase";
import {IProfileAction, IProfileState, UPDATE_CONNECTED_PROFILE} from "./types";

function defaultProfileState(): IProfileState {
	return {};
}

export function profil(state: IProfileState = defaultProfileState(), action: IProfileAction): IProfileState {
	switch (action.type) {
		case UPDATE_CONNECTED_PROFILE:
			return updateConnectedProfilCase(state, action)
		default:
			return state;

	}
}
