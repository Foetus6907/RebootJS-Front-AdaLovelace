import React, {Fragment} from 'react';
import {match, withRouter} from 'react-router-dom';
import {IConversation, IConversationMessage} from "../types";
import history from "../../history";
import {Container, createStyles, Grid, Paper, Theme, withStyles} from "@material-ui/core";
import MessageUserAttendedList from "./MessageUserAttendedList";
import MessageList from "./MessageList";
import {patchConversationSeen, sendMessage} from "../../api/methods";
import {IAppState} from "../../appReducer";
import {addSentMessageToConversationAction, changeCurrentConversationAction,} from "../actions/messagesActions";
import {connect} from "react-redux";
import {makeChangeCurrentConvFromUser} from "../actions/makeChangeCurrentConvFromUser";


const styles = (_theme: Theme) => createStyles({
	h100: {
		height: '100%'
	}
});

interface ChatInterfaceProps {
	match: match<{ conversationId: string }>;
	location: any;
	history: any;
	conversations: IConversation[];
	classes: any;

	currentConversation?: IConversation
	changeCurrentConversation: (conversation: IConversation) => void
	addSentMessageToConversation: (message: IConversationMessage) => void
	makeChangeCurrentConvFromUser: (conversationId: string, target: string) => void;
}

class ChatInterface extends React.Component<ChatInterfaceProps> {

	// TODO dispach/set global state current conversation based on conversation id and target
	async componentDidMount() {
		const conversations = this.props.conversations;
		console.log('didmount', conversations)

		const conversationId = this.props.match.params.conversationId;
		let conversation = conversations.find(conv => conv._id === conversationId);
		if (conversation) {
			this.props.changeCurrentConversation(conversation)
		} else {
			const target = new URLSearchParams(this.props.location.search).get('target')
			if (!target) {
				return history.push('/')
			} else {
				this.props.makeChangeCurrentConvFromUser(conversationId, target)
			}
		}
	}

	doSendMessage = async (message: string) => {
		console.log('message', message)
		const {currentConversation} = this.props;
		console.log('conversation', currentConversation)

		if (currentConversation) {
			const sentMessage: IConversationMessage = await sendMessage(currentConversation._id, currentConversation.targets, message);
			// Redux dispach sendMessage to set state of current conversation  with new message state
			this.props.addSentMessageToConversation(sentMessage)
		}
	}

	conversationSeen = () => {
		if (this.props.currentConversation) {
			patchConversationSeen(this.props.currentConversation._id).then().catch(e => console.log(e));
		}
	}

	render() {
		return <React.Fragment>
			<h1>Chat</h1>
			{this.props.currentConversation ?
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
									<MessageUserAttendedList/>
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Fragment> :
				<h1>Impossible de trouver la conversation</h1>}
		</React.Fragment>
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		currentConversation: state.messages.currentConversation,
		conversations: state.messages.conversations
	}
}
const mapDispatchToProps = (dispatch: any) => ({
	changeCurrentConversation: (conversation: IConversation) => dispatch(changeCurrentConversationAction(conversation)),
	addSentMessageToConversation: (message: IConversationMessage) => dispatch(addSentMessageToConversationAction(message)),
	makeChangeCurrentConvFromUser: (conversationId: string, target: string) => dispatch(makeChangeCurrentConvFromUser(conversationId, target))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ChatInterface)));
