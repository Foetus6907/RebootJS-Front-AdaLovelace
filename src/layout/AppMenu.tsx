import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import {Forum, Menu} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { ProfilButton } from './ProfilButton';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface AppMenuProps {
  show: () => void;
  showDrawer: boolean;
}

export function AppMenu({ show, showDrawer } : AppMenuProps){
  return (
    <Fragment>
      <AppBar position="static" style={{ height: '10vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Toolbar>
              <IconButton onClick={()=> show()} color='default' aria-label="profile">
                {!showDrawer ? <Menu fontSize="large"/> : <CloseIcon fontSize="large" />}
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3">flint.</Typography>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <h1>Nom de l'utilisateur</h1>
            </Toolbar>
          </Grid>
          <Grid item>
            <ProfilButton />
          </Grid>
        </Grid>
      </AppBar>
    </Fragment>
  );
}


export default AppMenu;