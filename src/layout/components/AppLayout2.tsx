import React, {Component, Fragment} from 'react';
import AppMenu from "./AppMenu";
import AppContent from "./AppContent";
import AppDrawer, {drawerWidth} from "./AppDrawer";
import {Theme, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {IAppState} from "../../appReducer";
import {makePollingConversationsStopAction} from "../../messages/actions/makePollingConversationsStartAction";


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
  makePollingConversationsStop: () => void;
}

interface AppLayout2State {
  // users: User[];
  polling?: NodeJS.Timeout;
}

class AppLayout2 extends Component<AppLayoutProps, AppLayout2State> {
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
    showDrawer: state.layout.showDrawer,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  makePollingConversationsStop: () => dispatch(makePollingConversationsStopAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout2));
