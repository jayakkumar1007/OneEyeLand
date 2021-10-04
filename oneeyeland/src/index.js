import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Route component={App} exact path='/' />
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);