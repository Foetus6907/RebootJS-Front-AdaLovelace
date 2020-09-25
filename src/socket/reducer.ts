import {
	ISocketAction,
	ISocketState,
	SET_SOCKET_STATE,
} from "./types";
import {setSocketStateCase} from "./cases/socketCases";



function defaultSocketState() {
	return {
		socket: undefined
	};
}

export function socket(state: ISocketState = defaultSocketState(), action: ISocketAction): ISocketState {

	switch (action.type) {
		case SET_SOCKET_STATE:
			return setSocketStateCase(state, action)
		default:
			return state
	}
}
