import * as React from 'react';
import { Route, Switch } from 'react-router';
import OpenColony from 'app/containers/OpenColony';
import Tasks from 'app/containers/Tasks';
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';

export const App = hot(module)(() => (
  <Switch>
    <div>
      <Route exact path="/" component={OpenColony} />
      <Route path="/tasks" component={Tasks} />
    </div>
  </Switch>
));
