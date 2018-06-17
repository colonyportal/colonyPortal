import * as React from 'react';
import { Route, Switch } from 'react-router';
import OpenColony from 'app/containers/OpenColony';
import Tasks from 'app/containers/Tasks';
import MyTasks from 'app/containers/MyTasks';
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import CreateTask from 'app/containers/CreateTask';

export const App = hot(module)(() => (
  <Switch>
    <div>
      <Route exact path="/" component={OpenColony} />
      <Route path="/:colonyAddress" component={Tasks} />
      <Route path="/my_tasks" component={MyTasks} />
      <Route path="/create_task" component={CreateTask} />
    </div>
  </Switch>
));
