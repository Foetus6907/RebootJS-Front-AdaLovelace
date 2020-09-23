export const defaultMessagesState = () => {
	return {
		currentConversation: {
			_id: "0",
			messages: [],
			unseenMessages: 0,
			updatedAt: new Date().toLocaleDateString(),
			targets: []
		},
		conversations: [],
		polling: undefined
	}
}
