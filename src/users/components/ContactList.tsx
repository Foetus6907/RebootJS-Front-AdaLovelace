import React from 'react';
import ContactListItem from './ContactListItem';
import {Link, List, ListItem} from '@material-ui/core';
import history from "../../history";
import {IProfile} from "../../profile/types";
import {IAppState} from "../../appReducer";
import {connect} from "react-redux";
import {makeChangeCurrentConvFromUser} from "../../messages/actions/makeChangeCurrentConvFromUser";

interface ContactListProps {
	users: IProfile[];
	connectedUser?: IProfile;
	makeChangeCurrentConvFromUser: (conversationId: string, target: string) => void;
}

class ContactList extends React.Component<ContactListProps> {
	createConversation = (target: string) => {
		// TOTO dispach setcurrentconversation
		const {connectedUser} = this.props;
		if (connectedUser) {
			const conversationId = this.generateConversationId(connectedUser._id, target);
			this.props.makeChangeCurrentConvFromUser(conversationId, target)
			return history.push(`/conversation/${conversationId}?target=${target}`);
		}
	}

	generateConversationId = (userId: string, target: string): string => {
		return Buffer.from([userId, target, new Date().toISOString()].join('_')).toString('base64');
	}

	render() {
		return <div>
			<h1>Liste de contact</h1>
			<List>
				{this.props.users.map((user, index) => {
					return <ListItem button onClick={(_event) => {
						this.createConversation(user._id)
					}} key={index}>
						<ContactListItem firstname={user.firstname} lastname={user.lastname}/>
					</ListItem>
				})}
			</List>

			<Link href='/login' component="button" color="inherit">Login</Link>
		</div>
	}
}


const mapStateToProps = (state: IAppState) => ({
	users: state.profil.users,
	connectedUser: state.profil.connectedProfile
})

const mapDispatchToProps = (dispatch: any) => ({
	makeChangeCurrentConvFromUser: (conversationId: string, target: string) => dispatch(makeChangeCurrentConvFromUser(conversationId, target)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
