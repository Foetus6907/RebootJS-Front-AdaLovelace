import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';
import history from "./history";
import AppLayout2 from "./layout/AppLayout2";

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
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppLayout2/>
      </ThemeProvider>
    </Router>
  );
}

export default App;
