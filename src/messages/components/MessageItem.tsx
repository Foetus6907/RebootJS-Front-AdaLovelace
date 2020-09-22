import React, {Component} from 'react';
import {IConversationMessage} from "../types";
import {Box, ListItem} from "@material-ui/core";

interface MessageProps {
	message: IConversationMessage
}

interface MessageState {

}

class MessageItem extends Component<MessageProps, MessageState> {
	constructor(props: MessageProps) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<ListItem alignItems="flex-start">
				<Box color="white" bgcolor="lightblue" borderColor="grey" boxShadow="2px 1px" padding="5px"
				     borderRadius="10px">
					<p>{this.props.message.content}</p>
				</Box>
			</ListItem>
		);
	}
}

export default MessageItem;
