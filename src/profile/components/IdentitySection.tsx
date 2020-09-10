import React from 'react';
import {validateRequiredField} from "../../utils/fieldsValidadors";
import {Box, TextField} from "@material-ui/core";
import {defaultFormField, IFormField} from "../../utils/types";

interface IdentitySectionState {
  email: IFormField,
  firstname: IFormField,
  lastname: IFormField
}

interface IdentitySectionProps {
  email: string,
  firstname: string,
  lastname: string
}

class IdentitySection extends React.Component <IdentitySectionProps,IdentitySectionState> {
  constructor(props: IdentitySectionProps){
    super(props)
    this.state = {
      email: defaultFormField(),
      firstname: defaultFormField(),
      lastname: defaultFormField()
    }
  }

  render() {
    const { email, firstname, lastname} = this.state;

    return (
      <Box style={{ margin: '2rem 0'}}>
        <TextField
          label="Email"
          value={email.value}
          required={true}
          onChange={(event) => this.setState({
            email: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
          })}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( email.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
        />
        <TextField
          label="Firstname"
          value={firstname.value}
          required={true}
          onChange={(event) => this.setState({
            firstname: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
          })}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( firstname.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
        />
        <TextField
          label="Lastname"
          value={lastname.value}
          required={true}
          onChange={(event) => this.setState({
            lastname: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
          })}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( lastname.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
        />
      </Box>
    );
  }
}

export default IdentitySection;