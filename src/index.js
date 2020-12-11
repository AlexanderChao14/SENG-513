import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Controller from './controller';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Verify  from "./loginComponents/verify"
import ResetPass from "./loginComponents/resetpass"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={Controller}/>
        <Route exact path ="/verify/" component={Verify}/>
        <Route exact path="/resetpassword/" component={ResetPass}/>
        <Redirect from="*" to="/"/>
      </Switch>
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
