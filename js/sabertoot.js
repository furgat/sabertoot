import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout';
import Settings from './components/pages/Settings';
import Timelines from './components/pages/Timelines';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Timelines}></IndexRoute>
      <Route path='/timelines' component={Timelines}></Route>
      <Route path='/settings' component={Settings}></Route>
      <Route path='/add_domain' component={AddDomain}></Route>
      <Route path='/add_account' component={AddAccount}></Route>
    </Route>
  </Router>,
app);
