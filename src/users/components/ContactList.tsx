import React from 'react';
import ContactListItem from './ContactListItem';
import {List, ListItem, Link} from '@material-ui/core';
import history from "../../history";
import {IProfile} from "../../profile/types";
import {IAppState} from "../../appReducer";
import {connect} from "react-redux";

interface ContactListProps {
  users: IProfile[];
  connectedUser?: IProfile;
}

class ContactList extends React.Component<ContactListProps>{
  createConversation = (target: string) => {
    // TOTO dispach setcurrentconversation
    const {connectedUser} = this.props;
    if(connectedUser){
      const conversationId = this.generateConversationId(connectedUser._id, target);
      return history.push(`/conversation/${conversationId}?target=${target}`);
    }
  }

  generateConversationId = (userId: string, target: string) : string => {
    return Buffer.from([userId, target, new Date().toISOString()].join('_')).toString('base64');
  }

  render(){
    return <div>
      <h1>Liste de contact</h1>
      <List>
        {this.props.users.map((user, index) => {
          return  <ListItem button onClick={(_event) => {this.createConversation(user._id)}} key={index}>
                    <ContactListItem firstname={user.firstname} lastname={user.lastname}/>
                  </ListItem>
        })}
      </List>

      <Link href='/login' component="button" color="inherit">Login</Link>
      </div>
  }
}


const mapStateToProps = (state: IAppState) => ({
  users: state.profil.users,
  connectedUser: state.profil.connectedProfile
})

export default connect(mapStateToProps)(ContactList);
