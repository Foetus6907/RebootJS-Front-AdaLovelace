import React, {Component, Fragment} from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {IProfile} from "../../profile/types";

interface UserListItemProps {
	user: IProfile;
}

class UserListItem extends Component<UserListItemProps> {
	render() {
		return (
			<Fragment>
				<ListItem alignItems="center" >
					<ListItemAvatar>
						<Avatar alt={this.props.user.firstname[0]}/>
					</ListItemAvatar>
					<ListItemText
						primary={`${this.props.user.firstname} ${this.props.user.lastname}`}
					/>
				</ListItem>
				<Divider variant="fullWidth" component="li"/>
			</Fragment>
		);


	}
}

export default (UserListItem);
