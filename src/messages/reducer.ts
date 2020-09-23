import {
	ADD_NEW_CONVERSATION_TO_CONVERSATIONS,
	ADD_SENT_MESSAGE_TO_CONVERSATION,
	CHANGE_CURRENT_CONVERSATION,
	GET_ALL_CONVERSATIONS,
	IMessagesAction,
	IMessagesState, SET_POLLING, STOP_POLLING
} from "./types";
import {
	addNewConversationToConversationsCase,
	addSentMessageToConversationCase,
	changeCurrentConversationCase,
	getAllConversationsCase, setPollingStateCase, stopPollingStateCase
} from "./cases/messagesCases";
import {defaultMessagesState} from "./utils/defaultMessagesState";


export function messages(state: IMessagesState = defaultMessagesState(), action: IMessagesAction): IMessagesState {

	switch (action.type) {
		case GET_ALL_CONVERSATIONS:
			return getAllConversationsCase(state, action)
		case CHANGE_CURRENT_CONVERSATION:
			return changeCurrentConversationCase(state, action)
		case ADD_SENT_MESSAGE_TO_CONVERSATION:
			return addSentMessageToConversationCase(state, action)
		case ADD_NEW_CONVERSATION_TO_CONVERSATIONS:
			return addNewConversationToConversationsCase(state, action)
		case SET_POLLING:
			return setPollingStateCase(state, action)
		case STOP_POLLING:
			return stopPollingStateCase(state, action)
		default:
			return state
	}
}
