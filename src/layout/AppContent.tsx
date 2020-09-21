import React from 'react';
import {Switch, Route} from "react-router-dom";
import Login from "../login/components/Login";
import MyProfile from "../profile/components/MyProfile";
import HomeScreen from "./HomeScreen";
import ChatInterface from "./ChatInterface";
import {IConversation} from "../messages/types";
import {User} from "../users/types";

interface AppContentProps {
    conversations: IConversation[];
    users: User[];
    connectedUser?: User;
}

class AppContent extends React.Component<AppContentProps> {
    componentDidMount() {
        console.log('app appCon', this.props.connectedUser)

    }

    render() {
    return (
      <Switch>
        <Route path='/conversation/:conversationId' component={() => {
            return <ChatInterface conversations={this.props.conversations} users={this.props.users} />
        }}/>
        <Route path='/profil' component={()=> {
            return <MyProfile connectedUser={this.props.connectedUser}/>
        }}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={HomeScreen}/>
      </Switch>
    );
  }
}

export default AppContent;
