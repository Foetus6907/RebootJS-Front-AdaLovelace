import {ISocketAction, ISocketState} from "../types";

export function setSocketStateCase(state: ISocketState, action: ISocketAction) {
	return {
		state,
		socket: action.socket
	};
}
