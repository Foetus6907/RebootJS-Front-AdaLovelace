import {IAppState} from "../../appReducer";
import {setSocketStateAction} from "./setSocketStateAction";

export function makeStopSocket(): (dispatch: any, getState: ()=> IAppState) => void {
	return (dispatch: any, getState: () => IAppState) => {
		getState().socket.socket?.close()
		getState().socket.socket?.disconnect()
		dispatch(setSocketStateAction(undefined))
	}
}
