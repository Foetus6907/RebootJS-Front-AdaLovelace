import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {makeInitAppAction} from "./layout/actions/makeInitApp";
import {ThunkDispatch} from "redux-thunk";
import {IAppState} from "./appReducer";
import {Action} from "redux";
import {store} from "./store";

(store.dispatch as ThunkDispatch<IAppState, void, Action>)(makeInitAppAction());
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
