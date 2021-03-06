'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout';
import Index from './components/Pages/Index';
import Settings from './components/Pages/Settings';
import Timelines from './components/Pages/Timelines';
import NewAccount from './components/Pages/NewAccount';
import AddDomain from './components/NewAccount/AddDomain';
import AddAccount from './components/NewAccount/AddAccount';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path='/timelines' component={Timelines}></Route>
      <Route path='/settings' component={Settings}></Route>
      <Route path='/newaccount' component={NewAccount}>
        <IndexRoute component={AddDomain}></IndexRoute>
        <Route path='/newaccount/domain' component={AddDomain}></Route>
        <Route path='/newaccount/user' component={AddAccount}></Route>
      </Route>
    </Route>
  </Router>,
app);
