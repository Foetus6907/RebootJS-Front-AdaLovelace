import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Alert} from '@material-ui/lab';
import React from 'react';
import {defaultFormField, defaultPasswordField, IProfileFormFields} from '../../utils/types';
import {validateEmailField, validateNameField, validatePasswordField} from "../../utils/fieldsValidadors";
import IdentitySection from "./IdentitySection";
import CredentialsSection from "./CredentialsSection";
import {IProfile} from "../types";
import {IAppState} from "../../appReducer";
import {connect} from "react-redux";

interface IProfileFormProps {
	connectedProfile?: IProfile;
}

interface IProfileFormState {
	status: 'ready' | 'success' | 'error';
	fields: IProfileFormFields;
}

class MyProfile extends React.Component<IProfileFormProps, IProfileFormState> {
	constructor(props: IProfileFormProps) {
		super(props);
		this.state = {
			status: 'ready',
			fields: {
				email: defaultFormField(),
				firstname: defaultFormField(),
				lastname: defaultFormField(),
				password: defaultPasswordField(),
				confirmation: defaultFormField(),
			}
		}
	};

	resetProfile = () => {
		if (this.props.connectedProfile) {
			this.changeField('email')(this.props.connectedProfile.email);
			this.changeField('firstname')(this.props.connectedProfile.firstname);
			this.changeField('lastname')(this.props.connectedProfile.lastname);
			this.changeField('password')('');
			this.changeField('confirmation')('');
		}
	}

	saveProfile = () => {
		console.log('Implementation du Patch')
	}

	changeField = (field: 'email' | 'firstname' | 'lastname' | 'password' | 'confirmation'): ((value: string) => void) => {
		return (value: string) => {
			console.log('value', value)
			console.log('filed', this.state.fields)

			const newState = {
				fields: {
					...this.state.fields,
					[field]: {...this.state.fields[field], value: value}
				}
			};

			// checking fiels conditions
			switch (field) {
				case 'email':
					const {email} = newState.fields;
					validateEmailField(email);
					break;
				case 'firstname':
					const {firstname} = newState.fields;
					validateNameField(firstname);
					break;
				case 'lastname':
					const {lastname} = newState.fields;
					validateNameField(lastname);
					break;
				case 'password':
				case 'confirmation':
					const {password, confirmation} = newState.fields;
					validatePasswordField(password, confirmation, true);
					break;
			}
			console.log('befor Setstate', newState)

			this.setState({
				...this.state,
				fields: newState.fields
			});
		}
	}

	initProfile = () => {
		if (this.props.connectedProfile) {
			this.setState({
				...this.state,
				fields: {
					...this.state.fields,
					email: {value: this.props.connectedProfile.email, isValid: true},
					firstname: {value: this.props.connectedProfile.firstname, isValid: true},
					lastname: {value: this.props.connectedProfile.lastname, isValid: true},
				}
			})
		}
	}

	componentDidMount() {
		this.initProfile();
	}

	render() {
		const {status, fields} = this.state;
		const {email, firstname, lastname, password, confirmation} = fields;
		return (
			<Container>
				<Box style={{margin: '2rem 0'}}>
					{status !== 'ready' ?
						<Alert severity={status}>
							{status === 'success' ? 'Utilisateur connecté' : 'Utilisateur inexistant'}
						</Alert> : null}
				</Box>
				<Box style={{margin: '2rem 0'}}>
					<Grid container justify="flex-end">
						<Grid item xs={2}>
							<Button variant="contained" color="secondary" fullWidth={true}
							        onClick={(_event) => console.log('Implementation du Logout')}>
								Logout
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button variant="contained" color="secondary" fullWidth={true}
							        onClick={(_event) => console.log('Implementation du Delete')}>
								Delete account
							</Button>
						</Grid>
					</Grid>
				</Box>
				<form onSubmit={(e) => {
					e.preventDefault();
					this.saveProfile()
				}}>
					<Box style={{margin: '2rem 0'}}>
						<Grid container justify="space-evenly" alignItems="flex-start">
							<Grid item xs={4}>
								<IdentitySection
									email={email}
									firstname={firstname}
									lastname={lastname}
									changeEmail={this.changeField("email")}
									changeFirstname={this.changeField("firstname")}
									changeLastname={this.changeField("lastname")}
								/>
							</Grid>
							<Grid item xs={4}>
								<CredentialsSection
									password={password}
									confirmation={confirmation}
									changePassword={this.changeField("password")}
									changeConfirmation={this.changeField("confirmation")}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box style={{margin: '2rem 0'}}>
						<Grid container justify="space-between">
							<Grid item xs={2}>
								<Button variant="contained" fullWidth={true}
								        onClick={() => this.initProfile()}>
									Reset
								</Button>
							</Grid>
							<Grid item xs={2}>
								<Button variant="contained" color="primary" fullWidth={true} type="submit">
									Save
								</Button>
							</Grid>
						</Grid>
					</Box>
				</form>
			</Container>
		);
	}
}

const mapStateToProps = ({profil}: IAppState) => {
	return {
		connectedProfile: profil.connectedProfile,
	}
}

export default connect(mapStateToProps)(MyProfile);
