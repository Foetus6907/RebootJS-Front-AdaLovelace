import React from 'react';
import {Switch, Route} from "react-router-dom";
import Login from "../login/components/Login";
import MyProfile from "../profile/components/MyProfile";
import HomeScreen from "./HomeScreen";
import ChatInterface from "./ChatInterface";
import {IConversation} from "../conversations/types";
import {User} from "../users/types";

interface AppContentProps {
    conversations: IConversation[];
    users: User[];
    sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void
}

class AppContent extends React.Component<AppContentProps> {
  render() {
    return (
      <Switch>
        <Route path='/conversation/:conversationId' component={() => {
            return <ChatInterface conversations={this.props.conversations} users={this.props.users} sendMessage={this.props.sendMessage}/>
        }}/>
        <Route path='/profil' component={MyProfile}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={HomeScreen}/>
      </Switch>
    );
  }
}

export default AppContent;
