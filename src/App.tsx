import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';
import history from "./history";
import AppLayout2 from "./layout/components/AppLayout2";
import {Provider} from "react-redux";
import {store} from "./store";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      contrastText: "white"
    },
    secondary: {
      main: "#f44336",
      contrastText: "white"
    }
  },
})


function App() {
  return (
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <AppLayout2/>
          </ThemeProvider>
        </Router>
      </Provider>
  );
}

export default App;
