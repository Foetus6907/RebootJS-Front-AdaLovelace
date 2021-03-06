import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import BlockIcon from '@material-ui/icons/Block';

interface MessageSenderFormProps {
	sendMessage: (content: string) => void;
}

interface MessageSenderFormState {
	message: string;
}

class MessageSenderForm extends Component<MessageSenderFormProps, MessageSenderFormState> {
	constructor(props: MessageSenderFormProps) {
		super(props);
		this.state = {
			message: ''
		}
	}

	render(){
		return <React.Fragment>
			<form onSubmit={(event) => {
				event.preventDefault();
				this.props.sendMessage(this.state.message);
				this.setState({message: ''});
			}}>
        <textarea value={this.state.message} rows={3} onChange={(event) => {
	        event.preventDefault();
	        this.setState({message: event.target.value})
        }}/>
				<Button
					color="primary"
					variant="contained"
					type="submit"
					disabled={(!this.state.message)}
					startIcon={(!this.state.message) ? <BlockIcon color="error"/> : <DoneOutlineIcon />}
					fullWidth={true}
				>Send</Button>
			</form>

		</React.Fragment>
	}
}

export default MessageSenderForm;
