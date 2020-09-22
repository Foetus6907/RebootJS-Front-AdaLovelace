import React from 'react';
import {IProfile} from "../../profile/types";
import {List} from "@material-ui/core";
import UserListItem from '../../users/components/UserListItem';
import {IAppState} from "../../appReducer";

import {connect} from "react-redux";

interface MessageUserAttendedListProps {
	attendedUsers: IProfile[];
}


class MessageUserAttendedList extends React.Component<MessageUserAttendedListProps> {
	render() {
		return (
			 <List>
				 {this.props.attendedUsers?.map((userAttended: IProfile, index: number) => {
					 return <UserListItem key={index} user={userAttended}/>
				 })}
			 </List>
			)
	}
}

const mapStateToProps= (state : IAppState) => {
	return {
		attendedUsers: state.profil.users.filter(user => state.messages.currentConversation.targets.includes(user._id)),
	}
}

export default connect(mapStateToProps)(MessageUserAttendedList);
