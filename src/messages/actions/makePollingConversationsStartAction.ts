import {IAppState} from "../../appReducer";
import {getConversations3} from "../../api/methods";
import {setAllConversationsAction, setPollingAction} from "./messagesActions";
import {IMessagesAction} from "../types";

export function makePollingConversationsStartAction(): (dispatch: any, getState: () => IAppState) => Promise<void> {
	return async (dispatch: (arg: IMessagesAction) => IMessagesAction, getState: () => IAppState) => {
		// Check if store a contain connectedUser
		const connectedProfile = getState().profil.connectedProfile;
		// fetch conversations data from API with connectedUser
		if (connectedProfile) {
			const polling = setInterval(async () => {
				try {
					const conversationsData = await getConversations3(connectedProfile)
					// dispach action to set conversation in store
					dispatch(setAllConversationsAction(conversationsData))
					return
				} catch (error) {
					console.log("Error fetching conversations", error)
				}
			}, 300000);

			// set polling state
			dispatch(setPollingAction(polling))

		} else { // else do nothing
			return
		}
	}
}
export function makePollingConversationsStopAction(): (dispatch: any, getState: () => IAppState) => Promise<void> {
	return async (dispatch: (arg: IMessagesAction) => IMessagesAction, getState: () => IAppState) => {

			const polling = getState().messages.polling
			if (polling) {
				clearInterval(polling);
				dispatch(setPollingAction(polling))
				return
			} else {
				return
			}
	}
}
