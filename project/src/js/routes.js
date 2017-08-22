"use strict";

import React from 'react';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import App from './components/app';
import SignupPage from './components/signup-page';
import LoginPage from './components/login-page';
import ConfigPage from './components/config-page';
import NotFoundPage from './components/not-found-page';

export default (
  <Router>
    <Route path="email" name="app" component={App}>
      <IndexRoute name="loginPage" component={LoginPage}/>
      <Route path="signup" name="signupPage" component={SignupPage}/>
      <Route path="config" name="configPage" component={ConfigPage}/>
    </Route>
    <Route path="*" component={App}>
      <IndexRoute name="notFoundPage" component={NotFoundPage}/>
    </Route>
  </Router>
);
