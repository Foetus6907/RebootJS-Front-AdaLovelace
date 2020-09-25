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
import {IConversation} from "../types";
import {AvatarGroup} from "@material-ui/lab";
import {Link} from "react-router-dom";
import {IProfile} from "../../profile/types";
import {IAppState} from "../../appReducer";
import {connect} from "react-redux";
import {changeCurrentConversationAction} from "../actions/messagesActions";

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
  users: IProfile[];
  updateCurrentConversation: (conversation: IConversation) => void;
}

class Conversation extends Component<ConversationProps> {
  render() {
    return <Fragment>
        <ListItem  alignItems="flex-start" button onClick={()=> this.props.updateCurrentConversation(this.props.conversation)} component={Link}
                   to={this.props.conversation.messages.length === 0 ?
                       `/conversation/${this.props.conversation._id}?target=${this.props.conversation.targets[0]}` :
                       `/conversation/${this.props.conversation._id}`}>
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

const mapStateToProps= (state : IAppState) => {
  return {
    users: state.profil.users,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateCurrentConversation: (conversation: IConversation) => dispatch(changeCurrentConversationAction(conversation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Conversation));
