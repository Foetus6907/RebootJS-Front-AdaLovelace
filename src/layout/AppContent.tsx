import React from 'react';
import {Switch, Route} from "react-router-dom";
import MyContacts from "../users/components/MyContacts";
import Login from "../login/components/Login";


class AppContent extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" component={MyContacts} />
      </Switch>
    );
  }
}

export default AppContent;
