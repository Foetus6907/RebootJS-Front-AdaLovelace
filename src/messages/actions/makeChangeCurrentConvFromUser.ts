import {IAppState} from "../../appReducer";
import {IMessagesAction} from "../types";
import {addNewConversationToConversationsAction, changeCurrentConversationAction} from "./messagesActions";
import history from "../../history";

function generateConversationId (userId: string, target: string): string {
	return Buffer.from([userId, target, new Date().toISOString()].join('_')).toString('base64');
}

export function makeChangeCurrentConvFromUser(target: string): (dispatch: any, getState: () => IAppState) => void {
	return (dispatch: (arg: IMessagesAction) => IMessagesAction, getState: () => IAppState) => {
		console.log('makeChangeCurrentConvFromUser', target);
		const conversationExistant = getState().messages.conversations.find(conversation => {
			const targets =  conversation.targets.includes(target)
			return conversation.targets.length === 1 && targets ? true : false;
		})
		console.log('makeChangeCurrentConvFromUser', conversationExistant);
		if (conversationExistant) {
			dispatch(changeCurrentConversationAction(conversationExistant))
			conversationExistant.messages.length === 0 ?
				history.push(`/conversation/${conversationExistant._id}?target=${target}`) :
				history.push(`/conversation/${conversationExistant._id}`);
		} else {
			const connectedUserId = getState().profil.connectedProfile?._id;
			if (connectedUserId) {
				const conversationId = generateConversationId(connectedUserId , target)
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
				history.push(`/conversation/${conversationId}?target=${target}`);
			} else {
				history.push(`/`);
			}
		}
	}
}
