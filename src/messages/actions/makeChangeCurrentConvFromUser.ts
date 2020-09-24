import {IAppState} from "../../appReducer";
import {IMessagesAction} from "../types";
import {addNewConversationToConversationsAction, changeCurrentConversationAction} from "./messagesActions";


export function makeChangeCurrentConvFromUser(conversationId: string, target: string): (dispatch: any, getState: () => IAppState) => void {
	return (dispatch: (arg: IMessagesAction) => IMessagesAction, getState: () => IAppState) => {
		console.log(conversationId, target);
		console.log(getState().messages.conversations)
		const conversationExistant = getState().messages.conversations.find(conversation => conversation.targets.includes(target))
		console.log(conversationExistant);
		if (conversationExistant) {
			dispatch(changeCurrentConversationAction(conversationExistant))
		} else {

			let conversation = {
				_id: conversationId,
				messages: [],
				unseenMessages: 0,
				updatedAt: new Date().toLocaleDateString(),
				targets: [
					target
				]
			}
			// console.log('par ici')
			dispatch(changeCurrentConversationAction(conversation))
			dispatch(addNewConversationToConversationsAction(conversation))
		}

	}
}
