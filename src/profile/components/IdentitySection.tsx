import React from 'react';
import {Box, TextField} from "@material-ui/core";
import { IFormField} from "../../utils/types";

interface IdentitySectionProps {
  email: IFormField,
  firstname: IFormField,
  lastname: IFormField,
  changeEmail: (val: string) => void
  changeFirstname: (val: string) => void,
  changeLastname: (val: string) => void
}

class IdentitySection extends React.Component <IdentitySectionProps> {

  render() {
    const { email, firstname, lastname, changeEmail, changeFirstname, changeLastname } = this.props;

    return (
      <Box style={{ margin: '2rem 0'}}>
        <TextField
          label="Email"
          value={email.value}
          required={true}
          onChange={event => changeEmail(event.target.value)}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( email.isValid ? {} : { error: true, helperText: email.error })}
        />
        <TextField
          label="Firstname"
          value={firstname.value}
          required={true}
          onChange={event => changeFirstname(event.target.value)}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( firstname.isValid ? {} : { error: true, helperText: firstname.error })}
        />
        <TextField
          label="Lastname"
          value={lastname.value}
          required={true}
          onChange={event => changeLastname(event.target.value)}
          fullWidth={true}
          style={{margin: '0.5rem 0'}}
          variant="outlined"

          {...( lastname.isValid ? {} : { error: true, helperText: lastname.error })}
        />
      </Box>
    );
  }
}

export default IdentitySection;