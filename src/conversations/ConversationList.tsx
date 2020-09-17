import React, {Component} from 'react';
import {
  Link,
  List,
  Theme,
  withStyles
} from "@material-ui/core";
import Conversation from "./Conversation";
import {IConversation} from "./types";
import {User} from "../users/types";

const styles = (theme: Theme) => {
  return {
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }
}

interface ConversationListProps {
  classes: any;
  users: User[]
  conversations: IConversation[]
}

class ConversationList extends Component<ConversationListProps> {

  render() {
    return (
      <List component="nav">
        {
          this.props.conversations.map((conversation:IConversation, index:number) => {
            return <Conversation conversation={conversation} key={index} users={this.props.users}/>
          })
        }
        <Link href='/login' component="button" color="inherit">Login</Link>
      </List>
    );
  }
}

export default withStyles(styles)(ConversationList);
