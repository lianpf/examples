import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Layout from './layout/index';

export const routes = [
  {path: '/', exact: true, component: Layout, type: 'sync' },
]


export default () => (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/component"/>)}/>
        <Route path="/component" component={Layout}/>
        <Route component={Layout}/>
      </Switch>
    </Router>
)