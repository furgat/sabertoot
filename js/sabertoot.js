import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout';
import Index from './components/pages/Index';
import Settings from './components/pages/Settings';
import Timelines from './components/pages/Timelines';
import NewAccount from './components/pages/NewAccount';
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
        <Route path='/domain' component={AddDomain}></Route>
        <Route path='/user' component={AddAccount}></Route>
      </Route>
    </Route>
  </Router>,
app);
