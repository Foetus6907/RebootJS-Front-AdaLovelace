export const SET_SOCKET_STATE = "SET_SOCKET_STATE";

export interface ISetSocketStateAction {
	type: typeof SET_SOCKET_STATE,
	socket: SocketIOClient.Socket | undefined
}

export type ISocketAction = ISetSocketStateAction

export interface ISocketState {
	socket: SocketIOClient.Socket | undefined
}
