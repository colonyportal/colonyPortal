import * as React from 'react';
import { Route, Switch } from 'react-router';
import ColonyTest from 'app/containers/ColonyTest';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={ColonyTest} />
  </Switch>
));
