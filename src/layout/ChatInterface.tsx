import React, {Component} from 'react';
import MessageList from "../messages/MessageList";
import {IConversation} from "../conversations/types";
import {User} from "../users/types";
import {match, withRouter} from 'react-router-dom';
import MessageUserAttendedList from "../messages/MessageUserAttendedList";
import {Container, createStyles, Grid, Paper, Theme, withStyles} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
	h100:{
		height: '100%'
	}
});

interface ChatInterfaceProps {
	users: User[];
	conversations: IConversation[];
	match: match< {conversationId: string }>;
	location: any;
	history: any;
	classes: any;
	sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void;
}

interface ChatInterfaceState {
}


class ChatInterface extends Component<ChatInterfaceProps, ChatInterfaceState> {

	render(){
		let conversation = this.props.conversations?.find(conv => conv._id === this.props.match.params.conversationId);
		let attendeesList: User[] = [];

		if(!!conversation) {
			conversation.targets.forEach((target: string) => {
				const user = this.props.users.find( (user: User) => user._id === target);
				if(user) {
					attendeesList.push(user);
				}
			});
		}

		return !!conversation ? <React.Fragment>
			<Container className={this.props.classes.h100}>
				<Grid container spacing={2} className={this.props.classes.h100}>
					<Grid item xs={4} className={this.props.classes.h100}>
						<Paper elevation={3} className={this.props.classes.h100}>
							<MessageList conversation={conversation} messages={conversation.messages} sendMessage={this.props.sendMessage}/>
						</Paper>
					</Grid>

					<Grid item xs={4} className={this.props.classes.h100}>
						<Paper elevation={3} className={this.props.classes.h100}>
							<MessageUserAttendedList attendedUsers={attendeesList}/>
						</Paper>
					</Grid>
				</Grid>
			</Container>

		</React.Fragment> : null
	}
}

export default withRouter(withStyles(styles)(ChatInterface));
