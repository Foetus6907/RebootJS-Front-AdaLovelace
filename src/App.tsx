import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';
import { Router } from 'react-router-dom';
import history from "./history";
import AppContent from "./layout/AppContent";

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: yellow,
    },
})

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppContent/>
      </ThemeProvider>
    </Router>
  );
}

export default App;
