import React, {Component, Fragment} from 'react';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import {IConversation} from "./types";
import {AvatarGroup} from "@material-ui/lab";
import {User} from "../users/types";
import {Link} from "react-router-dom";

const styles = (_theme: Theme) => {
  return {
    inline: {
      display: 'inline',
    },
  }
}

interface ConversationProps {
  classes: any;
  conversation: IConversation;
  users: User[];
}

class Conversation extends Component<ConversationProps> {
  render() {
    return <Fragment>
        <ListItem  alignItems="flex-start" button component={Link} to={`/conversation/${this.props.conversation._id}`}>
          <ListItemAvatar>
            <AvatarGroup max={3}>
              {this.props.conversation.targets.map((target, index) => <Avatar key={index}>{this.getUserFormList(target)?.firstname[0] || 'Unknown User'[0]}</Avatar>)}
            </AvatarGroup>
          </ListItemAvatar>
          <ListItemText
              primary={this.props.conversation.messages.length > 0 ?  this.props.conversation.messages[0].content : ''}
              secondary={
                <React.Fragment>
                  <Typography
                      component="span"
                      variant="body2"
                      className={this.props.classes.inline}
                      color="textPrimary"
                  >
                    {this.props.conversation.targets.join(', ')}
                  </Typography>
                  {this.props.conversation.updatedAt}
                </React.Fragment>
              }
          />
        </ListItem>
      <Divider variant="fullWidth" component="li" />
    </Fragment>;
  }

  getUserFormList = (id: string) => this.props.users.find(user => user._id === id)
}



export default withStyles(styles)(Conversation);
