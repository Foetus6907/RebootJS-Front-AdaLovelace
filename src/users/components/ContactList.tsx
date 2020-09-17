import React from 'react';
import ContactListItem from './ContactListItem';
import { User } from '../types';
import {List, ListItem, Button, Link} from '@material-ui/core';

interface ContactListProps {
  users: User[];
}

class ContactList extends React.Component<ContactListProps>{
  render(){
    return <div>
      <h1>Liste de contact</h1>
      <List>
        {this.props.users.map((user, index) => {
          return  <ListItem key={index}>
                    <ContactListItem firstname={user.firstname} lastname={user.lastname}/>
                  </ListItem>
        })}
      </List>

      <Link href='/login' component="button" color="inherit">Login</Link>
      </div>
  }
}

export default ContactList;
