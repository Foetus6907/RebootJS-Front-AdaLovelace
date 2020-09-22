import React from 'react';
import {Switch, Route} from "react-router-dom";
import Login from "../../login/components/Login";
import MyProfile from "../../profile/components/MyProfile";
import HomeScreen from "./HomeScreen";
import ChatInterface from "../../messages/components/ChatInterface";

class AppContent extends React.Component {
    render() {
    return (
      <Switch>
        <Route path='/conversation/:conversationId' component={ChatInterface}/>
        <Route path='/profil' component={MyProfile}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={HomeScreen}/>
      </Switch>
    );
  }
}

export default AppContent;
