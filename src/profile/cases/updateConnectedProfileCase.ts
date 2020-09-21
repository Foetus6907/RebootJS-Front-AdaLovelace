import {IProfileAction, IProfileState} from "../types";

export function updateConnectedProfilCase(state: IProfileState, action: IProfileAction): IProfileState {
	return {
		...state,
		connectedProfile: action.profile
	}
}
