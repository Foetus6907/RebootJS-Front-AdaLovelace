import React from 'react';
import ContactListItem from './ContactListItem';
import {Link, List, ListItem} from '@material-ui/core';
import {IProfile} from "../../profile/types";
import {IAppState} from "../../appReducer";
import {connect} from "react-redux";
import {makeChangeCurrentConvFromUser} from "../../messages/actions/makeChangeCurrentConvFromUser";
import {IConversation} from "../../messages/types";

interface ContactListProps {
	users: IProfile[];
	connectedUser?: IProfile;
	makeChangeCurrentConvFromUser: (target: string) => void;
	conversations: IConversation[];
}

class ContactList extends React.Component<ContactListProps> {
	render() {
		return <div>
			<h1>Liste de contact</h1>
			<List>
				{this.props.users.map((user, index) => {
					return <ListItem button onClick={(_event) => {
						this.props.makeChangeCurrentConvFromUser(user._id)
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
	connectedUser: state.profil.connectedProfile,
	conversations: state.messages.conversations
})

const mapDispatchToProps = (dispatch: any) => ({
	makeChangeCurrentConvFromUser: (target: string) => dispatch(makeChangeCurrentConvFromUser(target)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
