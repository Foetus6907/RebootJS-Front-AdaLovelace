import React, {Fragment} from 'react';
import {match, withRouter} from 'react-router-dom';
import {IConversation, IConversationMessage} from "../types";
import history from "../../history";
import {Container, createStyles, Grid, Paper, Theme, withStyles} from "@material-ui/core";
import MessageUserAttendedList from "./MessageUserAttendedList";
import MessageList from "./MessageList";
import {patchConversationSeen, sendMessage} from "../../api/methods";
import {IAppState} from "../../appReducer";
import {
	addNewConversationToConversationsAction,
	addSentMessageToConversationAction,
	changeCurrentConversationAction,
} from "../actions/messagesActions";
import {connect} from "react-redux";


const styles = (_theme: Theme) => createStyles({
	h100:{
		height: '100%'
	}
});

interface ChatInterfaceProps {
	match: match<{ conversationId: string }>;
	location: any;
	history: any;
	conversations: IConversation[];
	classes: any;

	conversation?:IConversation
	changeCurrentConversation: (conversation: IConversation) => void
	addSentMessageToConversation: (message: IConversationMessage) => void
	addNewConversationToConversations: (conversation: IConversation) => void
}

class ChatInterface extends React.Component<ChatInterfaceProps> {

	// TODO dispach/set global state current conversation based on conversation id and target
	async componentDidMount() {
		const conversations = this.props.conversations;
		const conversationId = this.props.match.params.conversationId;
		let conversation = conversations.find(conv => conv._id === conversationId);
		if (conversation) {
			this.props.changeCurrentConversation(conversation)
		} else {
			const target = new URLSearchParams(this.props.location.search).get('target')
			if (!target) {
				return history.push('/')
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
				console.log('par la')
				this.props.addNewConversationToConversations(conversation)
				this.props.changeCurrentConversation(conversation)
			}
		}
	}

	doSendMessage = async (message: string) => {
		console.log('message', message)
		const { conversation } = this.props;
		console.log('conversation', conversation)

		if(conversation) {
			const sentMessage: IConversationMessage = await sendMessage(conversation._id, conversation.targets, message);

			// Redux dispach sendMessage to set state of current conversation  with new message state
			this.props.addSentMessageToConversation(sentMessage)
		}
	}

	conversationSeen = () => {
		if(this.props.conversation) { patchConversationSeen(this.props.conversation._id) }
	}

	render() {
		return <React.Fragment>
			<h1>Chat</h1>
			{this.props.conversation ?
				<Fragment>
					<Container className={this.props.classes.h100}>
						<Grid container spacing={2} className={this.props.classes.h100}>
							<Grid item xs={4} className={this.props.classes.h100}>
								<Paper elevation={3} className={this.props.classes.h100}>
									<MessageList conversationSeen={this.conversationSeen}
									             sendMessage={this.doSendMessage}/>
								</Paper>
							</Grid>

							<Grid item xs={4} className={this.props.classes.h100}>
								<Paper elevation={3} className={this.props.classes.h100}>
									<MessageUserAttendedList />
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Fragment> :
				<h1>Impossible de trouver la conversation</h1>}
		</React.Fragment>
	}
}

const mapStateToProps= (state : IAppState) => {
	return {
		conversation: state.messages.currentConversation,
		conversations: state.messages.conversations
	}
}
const mapDispatchToProps = (dispatch: any) => ({
	changeCurrentConversation: (conversation: IConversation) => dispatch(changeCurrentConversationAction(conversation)),
	addSentMessageToConversation: (message: IConversationMessage) => dispatch(addSentMessageToConversationAction(message)),
	addNewConversationToConversations: (conversation: IConversation) => dispatch(addNewConversationToConversationsAction(conversation))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ChatInterface)));
