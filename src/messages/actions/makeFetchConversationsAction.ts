import {IAppState} from "../../appReducer";
import {getConversations3} from "../../api/methods";
import {setAllConversationsAction} from "./messagesActions";
import {IMessagesAction} from "../types";

export function makeFetchConversationsAction(): (dispatch: any, getState: () => IAppState) => Promise<void> {
	return async (dispatch: (arg: IMessagesAction) => IMessagesAction, getState: () => IAppState) => {
		// Check if store a contain connectedUser
		const connectedProfile = getState().profil.connectedProfile;

		if (connectedProfile) {
			// fetch conversations data from API with connectedUser
			try {
				const conversationsData = await getConversations3(connectedProfile)
				// dispach action to set conversation in store
				dispatch(setAllConversationsAction(conversationsData))
				return
			} catch (e) {
				console.log("Error fetching conversations", e)
			}
		} else { // else do nothing
			return
		}
	}
}
