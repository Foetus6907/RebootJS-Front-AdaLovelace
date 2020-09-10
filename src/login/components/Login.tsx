import React from 'react';
import {Container, Tab, Tabs} from "@material-ui/core";
import LoginTabPanel from "./LoginTabPanel"
import {Person, PersonAdd} from "@material-ui/icons";
import LoginForm from "./LoginForm";
import RegisterForm from './RegisterForm';

interface LoginState {
  tab: number;
}

class LoginScreen extends React.Component<{}, LoginState> {
  constructor(props:{}) {
    super(props);
    this.state = {tab: 0}
  }

  render(){
    return (
      <Container>
        <Tabs
          indicatorColor='primary'
          textColor='primary'
          value={this.state.tab}
          variant='fullWidth'
          onChange={(_oldTab, newTab) => {
            this.setState({tab:newTab})
          }}>
          <Tab icon={<Person/>} label="Login"/>
          <Tab icon={<PersonAdd/>} label="RegisterForm"></Tab>
        </Tabs>
        <LoginTabPanel valueTab={this.state.tab} index={0}>
          <LoginForm />
        </LoginTabPanel>
        <LoginTabPanel valueTab={this.state.tab} index={1}>
          <RegisterForm></RegisterForm>
        </LoginTabPanel>
      </Container>
    )
  }
}

export default LoginScreen;