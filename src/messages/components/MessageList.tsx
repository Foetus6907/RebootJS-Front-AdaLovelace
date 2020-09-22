import React, {Component} from 'react';
import {List, Paper, Theme, withStyles} from "@material-ui/core";
import {IConversationMessage} from "../types";
import MessageItem from "./MessageItem";
import MessageSenderForm from "./MessageSenderForm";
import {IAppState} from "../../appReducer";
import {connect} from "react-redux";


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
  messages: IConversationMessage[];
  sendMessage: (content: string) => void;
  conversationSeen: () => void;
}

class MessageList extends Component <MessageListProps> {
  componentDidUpdate(prevProps: MessageListProps){
    const { messages } = this.props;
    const { messages: prevMessages } = prevProps;

    // reception ou envoi d'un nouveau message
    if(messages !== prevMessages){
      this.props.conversationSeen();
    }
  }

  componentDidMount(){
    // création initiale du composant => ouverture de la premiere conversation
    this.props.conversationSeen();
  }

  render() {
    return (
      <Paper elevation={3}>
        <List>
          { this.props.messages.map((message:IConversationMessage, index: number) =>{
            return <MessageItem key={index} message={message}/>
          })}
        </List>
        <MessageSenderForm
           sendMessage={this.props.sendMessage}/>
      </Paper>
    );
  }
}

const mapStateToProps= (state : IAppState) => {
  return {
    messages: state.messages.currentConversation.messages,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(MessageList));
