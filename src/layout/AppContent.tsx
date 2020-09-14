import React from 'react';
import {Switch, Route} from "react-router-dom";
import ContactList from "../users/components/ContactList";
import Login from "../login/components/Login";
import MyProfile from "../profile/components/MyProfile";

class AppContent extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/profil' component={MyProfile}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={ContactList}/>
      </Switch>
    );
  }
}

export default AppContent;
