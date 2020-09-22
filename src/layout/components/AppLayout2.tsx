import React, {Component, Fragment} from 'react';
import AppMenu from "./AppMenu";
import AppContent from "./AppContent";
import AppDrawer, {drawerWidth} from "./AppDrawer";
import {Theme, withStyles} from "@material-ui/core";
import {getConnectedProfile, getConversations3} from "../../api/methods";
import {IConversation} from "../../messages/types";
import {connect} from "react-redux";
import {IAppState} from "../../appReducer";
import {IProfile} from "../../profile/types";
import {updateConnectedProfileAction} from "../../profile/actions/ProfileAndUserAction";
import {setAllConversationsAction} from "../../messages/actions/messagesActions";
import {makeFetchUsersAction} from "../../profile/actions/makeFetchUsersAction";


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
  showDrawer: boolean;
  profile?: IProfile;
  updateIdentity: (profile: IProfile) => void;
  setAllConversations: (conversations: IConversation[]) => void;
  makeFetchUsers: () => void;
}

interface AppLayout2State {
  // users: User[];
  polling?: NodeJS.Timeout;
}

class AppLayout2 extends Component<AppLayoutProps, AppLayout2State> {
  fetchConversations = async (profile?:IProfile) => {
    if (!profile) return
    const conversations = await getConversations3(profile)
    this.props.setAllConversations(conversations)
    // this.setState({ conversations})
  }

  async componentDidMount(){
    try {
      this.props.makeFetchUsers()

      const users = await getConnectedProfile();
      if (!this.props.profile) {
        this.props.updateIdentity(users);
      }
      await this.fetchConversations(users);
    } catch (error) {
      console.log('Error getting conversations or connected user: ',error);
    }
    /*
    this.setState({ polling: setInterval(() => {
        try {
          this.fetchConversations(this.props.profile)
        } catch(error) {
          console.error(error);
        }
      }, 3000)})
     */
  }

  componentWillUnmount() {
    const {polling} = this.state;
    if (polling) clearInterval(polling);
  }

  render() {
    const { classes } = this.props;
    const filteredClasses = [classes.content, this.props.showDrawer && classes.contentShift].filter(Boolean).join(' ');
    // [ true && 'classe2' ] => [ 'classe2' ].filter(Boolean) => [ 'classe2 ']
    // [ false && 'classe2' ] => [ false ].filter(Boolean) => []


    return  <Fragment>
              <div className={filteredClasses}>
                <AppMenu/>
                <AppContent/>
              </div>
              <AppDrawer/>
            </Fragment>
  }
}

const mapStateToProps= (state : IAppState) => {
  return {
    profile: state.profil.connectedProfile,
    showDrawer: state.layout.showDrawer,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateIdentity: (profile: IProfile) => dispatch(updateConnectedProfileAction(profile)),
  setAllConversations: (conversations: IConversation[]) => dispatch(setAllConversationsAction(conversations)),
  makeFetchUsers: () => dispatch(makeFetchUsersAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout2));
