import React from 'react';
import {validateRequiredField} from "../../utils/fieldsValidadors";
import {Box, TextField} from "@material-ui/core";
import {defaultFormField, IFormField} from "../../utils/types";

interface CredentialsSectionState {
  password: IFormField,
  confirmPassword: IFormField,
}

interface CredentialsSectionProps {
  password: string,
  confirmPassword: string,
}

class CredentialsSection extends React.Component <CredentialsSectionProps,CredentialsSectionState> {
  constructor(props: CredentialsSectionProps){
    super(props)
    this.state = {
      password: defaultFormField(),
      confirmPassword: defaultFormField(),
    }
  }

  render() {
    const { password, confirmPassword } = this.state;

    return (
      <Box style={{ margin: '2rem 0'}}>
        <TextField
          label="Password"
          value={password.value}
          required={true}
          onChange={(event) => this.setState({
            password: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
          })}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( password.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
        />
        <TextField
          label="Confirm password"
          value={confirmPassword.value}
          required={true}
          onChange={(event) => this.setState({
            confirmPassword: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
          })}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( confirmPassword.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
        />
      </Box>
    );
  }
}

export default CredentialsSection;