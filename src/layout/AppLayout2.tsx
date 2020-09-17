import React, {Component, Fragment} from 'react';
import AppMenu from "./AppMenu";
import AppContent from "./AppContent";
import AppDrawer, {drawerWidth} from "./AppDrawer";
import {Theme, withStyles} from "@material-ui/core";
import {IDrawerContent} from "./types";
import {User} from "../users/types";
import {getConnectedProfile, getConversations, getUsers} from "../api/methods";
import {IConversation, IConversationMessage} from "../conversations/types";
import {IProfile} from "../profile/types";


const styles = (theme: Theme) => {
  return {
    content: {
      width: '100%',
      height: '100vh',
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      })
    },
    contentShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut
      })
    },
    drawer: {
      width: drawerWidth,
    }
  }
}

interface AppLayoutProps {
  classes: any;
}

interface AppLayout2State {
  showDrawer: boolean;
  drawerContent: IDrawerContent;
  users: User[];
  conversations: IConversation[];
}

class AppLayout2 extends Component<AppLayoutProps, AppLayout2State> {
  constructor(props: AppLayoutProps) {
    super(props);
    this.state = {
      showDrawer: false,
      drawerContent: "contacts",
      users: [],
      conversations: [],
    }
  }

  changeDrawerContent = (content: IDrawerContent) => {
    this.setState({drawerContent: content});
  }

  showDrawer = () => {
    this.setState({showDrawer: !this.state.showDrawer});
  }

  hideDrawer = () => {
    this.setState({
      showDrawer: false
    })
  }

  sendMessage = (conversationId: string, emitter: string, targets: string[], content: string) => {
    console.log('Message sent to back end', content, conversationId, emitter, targets) ;
    const conversation = this.state.conversations.find(conv => conv._id === conversationId);

    if(conversation){
      const newMessage: IConversationMessage = {
        _id: '',
        conversationId: conversation._id,
        createdAt: new Date().toString(),
        emitter: emitter,
        targets: targets,
        content: content
      };
      conversation.messages.push(newMessage);

      this.setState({
        conversations: [...this.state.conversations, conversation]
      });
    }
  }

  componentDidMount(){
    getUsers()
        .then(fetchedUsers => { this.setState({users: fetchedUsers})})
        .catch(error => console.log('Error getting users: ', error));

    getConversations()
        .then((conversations: IConversation[]) => {
          this.setState({ conversations: conversations})
        })
        .catch(errors => console.log('Error getting conversations: ',errors));
    /*
    getConnectedProfile()
        .then(profile => {
          this.setState({profile});
          this.resetProfile();
        })
    */
  }

  render() {
    const { classes } = this.props;
    const filteredClasses = [classes.content, this.state.showDrawer && classes.contentShift].filter(Boolean).join(' ');
    // [ true && 'classe2' ] => [ 'classe2' ].filter(Boolean) => [ 'classe2 ']
    // [ false && 'classe2' ] => [ false ].filter(Boolean) => []

    return  <Fragment>
              <div className={filteredClasses}>
                <AppMenu show={this.showDrawer} showDrawer={this.state.showDrawer}/>
                <AppContent conversations={this.state.conversations} users={this.state.users} sendMessage={this.sendMessage}/>
              </div>
              <AppDrawer users={this.state.users}
                         changeDrawerContent={this.changeDrawerContent}
                         drawerContent={this.state.drawerContent}
                         showDrawer={this.state.showDrawer}
                         hideDrawer={this.hideDrawer}
                         conversations={this.state.conversations}
              />
            </Fragment>
  }
}

export default withStyles(styles)(AppLayout2);
