import {IAppState} from "../../appReducer";
import {connect} from "../../api/socket_methods";
import {IConversationMessage} from "../../messages/types";
import {updateConversationWithNewMessageAction} from "../../messages/actions/messagesActions";
import {setSocketStateAction} from "./setSocketStateAction";

export function makeStartSocket(): (dispatch: any, getState: ()=> IAppState) => void {
	return (dispatch: any, getState: () => IAppState) => {
		const socket: SocketIOClient.Socket = connect()
		console.log('connection a socket')

		socket.on('connect', () => {
			console.log('Received user connection')
		})

		socket.on('new-message-received', (message: IConversationMessage) => {
			console.log('Received new message')

			dispatch(updateConversationWithNewMessageAction(message))
		})

		dispatch(setSocketStateAction(socket))
	}
}
