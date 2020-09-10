import React, {Component} from 'react';
import IdentitySection from '../../profile/components/IdentitySection'
import CredentialsSection from "../../profile/components/CredentialsSection";
import {Container, Grid} from "@material-ui/core";

class RegisterForm extends Component {
  render() {
    return (
      <Grid container  spacing={2}>
        <Grid item md={6} xs={12}>
          <Grid container justify="center" >
            <Container maxWidth='xs'>
              <IdentitySection email='' firstname='' lastname=''/>
            </Container>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container justify="center" >
            <Container maxWidth='xs'>
              <CredentialsSection confirmPassword='' password=''/>
            </Container>
          </Grid>
        </Grid>
      </Grid>

    );
  }
}

export default RegisterForm;