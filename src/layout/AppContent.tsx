import React from 'react';
import {Switch, Route} from "react-router-dom";
import MyContacts from "../users/components/MyContacts";
import Login from "../login/components/Login";
import MyProfile from "../profile/components/MyProfile";

class AppContent extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/profil' component={MyProfile}/>
        <Route path="/login" component={Login} />
        <Route path="/" component={MyContacts} />
      </Switch>
    );
  }
}

export default AppContent;
