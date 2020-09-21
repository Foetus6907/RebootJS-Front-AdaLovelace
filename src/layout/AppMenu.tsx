import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import {Forum, Menu} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { ProfilButton } from './ProfilButton';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import {IProfile} from "../profile/types";
import {connect} from "react-redux";
import {IAppState} from "../appReducer";
import {changeDrawerContentAction} from "./actions/changeDrawerContentAction";

interface AppMenuProps {
  show: (showDrawer: boolean) => void;
  showDrawer: boolean;
  profile?: IProfile
}


export function AppMenu({ show, showDrawer , profile } : AppMenuProps){
  return (
    <Fragment>
      <AppBar position="static" style={{ height: '10vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Toolbar>
              <IconButton onClick={()=> show(!showDrawer)} color='default' aria-label="profile">
                {!showDrawer ? <Menu fontSize="large"/> : <CloseIcon fontSize="large" />}
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item>
            <Link to='/login' style={{ textDecoration: 'none', color:'white'}}>
              <Toolbar>
                <Forum fontSize="large" />
                <Typography variant="h3">flint.</Typography>
              </Toolbar>
            </Link>
          </Grid>
          {
            profile ?
                <Grid item>
                  <Toolbar>
                    <h1>{profile.firstname} {profile.lastname}</h1>
                  </Toolbar>
                </Grid>
                : null
          }
          <Grid item>
            <ProfilButton />
          </Grid>
        </Grid>
      </AppBar>
    </Fragment>
  );
}

const mapStateToProps= ({ profil, layout} : IAppState) => {
  return {
    profile: profil.connectedProfile,
    showDrawer: layout.showDrawer
  }
}

const mapDispatchToProps =  (dispatch: any) => {
  return {
    show: (showDrawer: boolean) => {
      const content = showDrawer ? 'conversations' : undefined;

      dispatch(changeDrawerContentAction(content, showDrawer))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
