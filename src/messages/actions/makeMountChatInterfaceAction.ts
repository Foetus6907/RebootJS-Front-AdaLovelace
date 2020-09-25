import {IAppState} from "../../appReducer";
import {addNewConversationToConversationsAction, changeCurrentConversationAction} from "./messagesActions";
import history from "../../history";

export function makeMountChatInterfaceAction(conversationId: string, target?: string): (dispatch: any, getState: () => IAppState) => void {
	return  (dispatch: any, getState: () => IAppState) => {
		// load converation or create new
		const existingConversation = getState().messages.conversations.find(conversation => conversation._id === conversationId);
		if (existingConversation) {
			dispatch(changeCurrentConversationAction(existingConversation))
		} else {
			if (!target) {
				history.push('/')
			} else {
				// create new conve
				let conversation = {
					_id: conversationId,
					messages: [],
					unseenMessages: 0,
					updatedAt: new Date().toLocaleDateString(),
					targets: [
						target
					]
				}
				console.log('par ici', conversation)
				dispatch(changeCurrentConversationAction(conversation))
				dispatch(addNewConversationToConversationsAction(conversation))
			}
		}
	}
}
