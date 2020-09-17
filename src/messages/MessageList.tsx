import React, {Component} from 'react';
import { List, Paper, Theme, withStyles} from "@material-ui/core";
import {IConversation, IConversationMessage} from "../conversations/types";
import Message from "./Message";
import MessageSenderForm from "./MessageSenderForm";

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

interface MessageListProps {
  classes: any
  messages?: IConversationMessage[];
  sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void;
  conversation: IConversation;
}

class MessageList extends Component <MessageListProps> {
  render() {
    return (
      <Paper elevation={3}>
        <List>
          {this.props.conversation.messages.map((message:IConversationMessage, index: number) =>{
            return <Message key={index} message={message}/>
          })}
        </List>
        <MessageSenderForm
            conversationId={this.props.conversation._id}
            targets={this.props.conversation.targets} sendMessage={this.props.sendMessage}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(MessageList);
