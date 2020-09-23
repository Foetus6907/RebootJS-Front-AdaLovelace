import axios from 'axios';
import {IProfile} from "../profile/types";
import {IConversation, IConversationMessage} from "../messages/types";

// fetch users via the server
export function getUsers(): Promise<IProfile[]> {
	return axios.get(`${process.env.REACT_APP_BACKEND}/profil`, {withCredentials: true})
		.then(resp => {
			return resp.data
		}).catch((error) => console.log("Error getting Users List", error))
}

export function getConnectedProfile(): Promise<IProfile> {
	return axios.get(`${process.env.REACT_APP_BACKEND}/profil/me`, {withCredentials: true})
		.then(resp => resp.data)
		.catch((error) => console.log("Error getting Connected profile", error))
}

export function deleteProfil(): Promise<Boolean> {
	return axios.delete(`${process.env.REACT_APP_BACKEND}/profil`, {withCredentials: true})
		.then(resp => {
			return resp.status === 200;
		})
		.catch(err => {
			console.log('Error deleting profile', err)
			return false
		})
}

export function login(email: string, password: string): Promise<IProfile> {
	return axios
		.post(
			`${process.env.REACT_APP_BACKEND}/login`,
			{
				username: email,
				password: password
			},
			{
				withCredentials: true
			}
		)
		.then(resp => resp.data)
}

export function register(email: string, password: string, firstname: string, lastname: string): Promise<IProfile> {
	return axios.post(`${process.env.REACT_APP_BACKEND}/profil`, {email, password, firstname, lastname})
		.then((resp) => resp.data);
}


export async function getConversations3(connectedUser: IProfile): Promise<IConversation[]> {
	const messages: IConversationMessage[] = await axios.get(
		`${process.env.REACT_APP_BACKEND}/messages`,
		{ withCredentials: true }
	).then(res => res.data);
	// if not message send empty array
	if (messages.length === 0) return []

	const batches = messages.reduce<{ [converstionId: string]: IConversationMessage[] }>(
		(accumulator, message: IConversationMessage) => {
			return  {
						...accumulator,
						[message.conversationId]: [...(accumulator[message.conversationId] || []), message],
					}
		},
		{},
	);

	const conversations : IConversation[] = [];
	for (const conversationId in batches) {
		const messages = batches[conversationId];
		const attendees = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];
		const targets = attendees.filter((id) => id !== connectedUser._id);
		conversations.push({
			_id: conversationId,
			targets: targets,
			messages: messages,
			updatedAt: getLastMessageDate(messages),
			unseenMessages: 0
		})
	}
	return conversations;
}

function getLastMessageDate(messages: IConversationMessage[]) {
	return messages[messages.length - 1].createdAt
}

export async function sendMessage(conversationId: string, targets: string[], content: string): Promise<IConversationMessage> {
	const resp = await axios.post(`${process.env.REACT_APP_BACKEND}/messages`, {
		conversationId,
		targets,
		content
	}, {withCredentials: true})
	return resp.data as IConversationMessage
}

export async function patchConversationSeen(conversationId: string): Promise<IProfile>{
	console.log('patch conversation', conversationId, conversationId !== '0')
	if (conversationId !== '0') {
		try {
			const resp = await axios.patch(
				`${process.env.REACT_APP_BACKEND}/profil/conversation-seen/${conversationId}`,
				{},
				{ withCredentials: true }
			);
			return resp.data;
		} catch (e) {
			return Promise.reject(new Error('Error in patch conversation'))
		}
	} else {
		return Promise.reject(new Error('Error in patch conversation'))
	}
}

/*
export function getConversations(): Promise<IConversation[]> {
	return Promise.resolve([
		{
			_id: 'abcd',
			targets: [
				'5f5b4b1e9f83755dc618f7d6',
				'5f5e7dcd2b8f6a0d6ed53b6a'
			],
			updatedAt: new Date().toLocaleString(),
			unseenMessages: 0,
			messages: [
				{
					_id: '1',
					conversationId: 'abcd',
					createdAt: new Date().toLocaleString(),
					emitter: '5f5b4b1e9f83755dc618f7d6',
					targets: [
						'5f5e7dcd2b8f6a0d6ed53b6a'
					],
					content: 'Coucou'
				},
				{
					_id: '2',
					conversationId: 'abcd',
					createdAt: new Date().toLocaleString(),
					emitter: '5f5e7dcd2b8f6a0d6ed53b6a',
					targets: [
						'5f5b4b1e9f83755dc618f7d6'
					],
					content: 'Hey Comment tu vas ?'
				}
			]
		},
		{
			_id: 'dcba',
			targets: [
				'5f5b4b1e9f83755dc618f7d6',
				'5f5e7dcd2b8f6a0d6ed53b6a'
			],
			updatedAt: new Date().toLocaleString(),
			unseenMessages: 0,
			messages: [
				{
					_id: '1',
					conversationId: 'abcd',
					createdAt: new Date().toLocaleString(),
					emitter: '5f5b4b1e9f83755dc618f7d6',
					targets: [
						'5f5e7dcd2b8f6a0d6ed53b6a'
					],
					content: 'Hello you'
				},
				{
					_id: '2',
					conversationId: 'abcd',
					createdAt: new Date().toLocaleString(),
					emitter: '5f5e7dcd2b8f6a0d6ed53b6a',
					targets: [
						'5f5b4b1e9f83755dc618f7d6'
					],
					content: 'Hi how are you ?'
				}
			]
		}
	])
}
 */

