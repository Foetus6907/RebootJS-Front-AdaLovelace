import React, {Component, Fragment} from 'react';
import AppMenu from "./AppMenu";
import AppContent from "./AppContent";
import AppDrawer, {drawerWidth} from "./AppDrawer";
import {Theme, withStyles} from "@material-ui/core";
import {IDrawerContent} from "./types";

interface AppLayoutProps {
  classes: any;
}

interface AppLayout2State {
  showDrawer: boolean;
  drawerContent: IDrawerContent;
}

const styles = (theme: Theme) => {
  return {
    content: {
      width: '100%',
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

class AppLayout2 extends Component<AppLayoutProps, AppLayout2State> {
  constructor(props: AppLayoutProps) {
    super(props);
    this.state = {
      showDrawer: false,
      drawerContent: "contacts"
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

  render() {
    const { classes } = this.props;
    const filteredClasses = [classes.content, this.state.showDrawer && classes.contentShift].filter(Boolean).join(' ');
    // [ true && 'classe2' ] => [ 'classe2' ].filter(Boolean) => [ 'classe2 ']
    // [ false && 'classe2' ] => [ false ].filter(Boolean) => []

    return  <Fragment>
              <div className={filteredClasses}>
                <AppMenu show={this.showDrawer} showDrawer={this.state.showDrawer}/>
                <AppContent/>
              </div>
              <AppDrawer changeDrawerContent={this.changeDrawerContent} drawerContent={this.state.drawerContent} showDrawer={this.state.showDrawer} hideDrawer={this.hideDrawer}/>
            </Fragment>
  }
}

export default withStyles(styles)(AppLayout2);