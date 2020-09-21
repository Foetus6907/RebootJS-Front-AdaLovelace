import React from 'react';
import {User} from "../users/types";
import {List} from "@material-ui/core";
import UserListItem from '../users/components/UserListItem';

interface MessageUserAttendedListProps {
	attendedUsers: User[];
}

interface MessageUserAttendedListState {
}

class MessageUserAttendedList extends React.Component<MessageUserAttendedListProps, MessageUserAttendedListState> {
	render() {
		return (
			 <List>
				 {this.props.attendedUsers?.map((userAttended: User, index: number) => {
					 return <UserListItem key={index} user={userAttended}/>
				 })}
			 </List>
			)
	}
}

export default MessageUserAttendedList;
