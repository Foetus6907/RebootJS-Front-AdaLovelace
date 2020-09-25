import {ISetSocketStateAction, SET_SOCKET_STATE} from "../types";

export function setSocketStateAction(socket: SocketIOClient.Socket | undefined): ISetSocketStateAction {
	return {
		type: SET_SOCKET_STATE,
		socket: socket,
	}
}
