import React, {Component} from 'react';
import {Box, createStyles, Drawer, Grid, Theme, Tooltip, withStyles} from "@material-ui/core";
import {IDrawerContent} from "./types";
import ContactList from "../users/components/ContactList";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import ConversationList from "../conversations/ConversationList";
import {User} from "../users/types";
import {IConversation} from "../conversations/types";

const styles = (theme: Theme) => createStyles({
  drawerHeader: {
    textAlign: 'right',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    width: '500px'
  },
  drawerContent: {
  }
})

interface AppDrawerProps {
  showDrawer: boolean;
  hideDrawer: () => void;
  classes: any;
  drawerContent?: IDrawerContent;
  changeDrawerContent: (content: IDrawerContent) => void;
  users: User[];
  conversations: IConversation[]
}

interface AppDrawerState {
}

class AppDrawer extends Component<AppDrawerProps, AppDrawerState> {
  render() {
    const content = this.props.drawerContent === 'contacts' ?
        <ContactList users={this.props.users}/> :
        <ConversationList users={this.props.users} conversations={this.props.conversations}/>

    return this.props.showDrawer ?
      <Drawer
        variant="persistent"
        anchor="left"
        open={this.props.showDrawer}
        classes={{
          paper: this.props.classes.paper,
        }}>
        <Box className={this.props.classes.drawerHeader}>
          <Grid>
            <Grid item>
              <Tooltip title="Contacts">
                <IconButton onClick={()=> this.props.changeDrawerContent("contacts")} color='default' aria-label="profile">
                  <PeopleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Messages">
                <IconButton onClick={()=> this.props.changeDrawerContent("conversations")} color='default' aria-label="profile">
                  <ChatIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <IconButton onClick={this.props.hideDrawer} color='default' aria-label="profile">
                <CloseIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box className={this.props.classes.drawerContent}>
          {content}
        </Box>
      </Drawer> : null;
  }
}

export default withStyles(styles)(AppDrawer);
export const drawerWidth = 500;
