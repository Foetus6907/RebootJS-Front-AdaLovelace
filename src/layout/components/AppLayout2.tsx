import React, {Component, Fragment} from 'react';
import AppMenu from "./AppMenu";
import AppContent from "./AppContent";
import AppDrawer, {drawerWidth} from "./AppDrawer";
import {Theme, withStyles} from "@material-ui/core";
import {getConnectedProfile} from "../../api/methods";
import {connect} from "react-redux";
import {IAppState} from "../../appReducer";
import {IProfile} from "../../profile/types";
import {updateConnectedProfileAction} from "../../profile/actions/ProfileAndUserAction";
import {makeFetchUsersAction} from "../../profile/actions/makeFetchUsersAction";
import {makeFetchConversationsAction} from "../../messages/actions/makeFetchConversationsAction";
import {
  makePollingConversationsStartAction,
  makePollingConversationsStopAction
} from "../../messages/actions/makePollingConversationsStartAction";


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
  makeFetchUsers: () => void;
  makeFetchConversations: () => void;
  makePollingConversationsStart: () => void;
  makePollingConversationsStop: () => void;
}

interface AppLayout2State {
  // users: User[];
  polling?: NodeJS.Timeout;
}

class AppLayout2 extends Component<AppLayoutProps, AppLayout2State> {

  async componentDidMount(){
    try {
      const connectedProfile = await getConnectedProfile();
      this.props.updateIdentity(connectedProfile);
      this.props.makeFetchUsers()
      this.props.makeFetchConversations()
      this.props.makePollingConversationsStart()

    } catch (error) {
      console.log('Error getting conversations or connecteduser or users: ',error);
    }

  }

  componentWillUnmount() {
    this.props.makePollingConversationsStop()
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
  makeFetchUsers: () => dispatch(makeFetchUsersAction()),
  makeFetchConversations: () => dispatch(makeFetchConversationsAction()),
  makePollingConversationsStart: () => dispatch(makePollingConversationsStartAction()),
  makePollingConversationsStop: () => dispatch(makePollingConversationsStopAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout2));
