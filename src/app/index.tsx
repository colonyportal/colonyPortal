import * as React from 'react';
import { Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import { hot } from 'react-hot-loader';
import OpenColony from 'app/containers/OpenColony';
import Tasks from 'app/containers/Tasks';
import MyTasks from 'app/containers/MyTasks';
import CreateTask from 'app/containers/CreateTask';
import Dashboard from 'app/containers/Dashboard';
import Login from 'app/containers/Login';

export const App = hot(module)(() => (
  <Switch>
    <div>
      <Route exact path="/" component={OpenColony} />
      <Route path="/:colonyAddress/my_tasks" component={MyTasks} />
      <Route path="/:colonyAddress/create_task" component={CreateTask} />
      <Route exact path="/:colonyAddress/tasks" component={Tasks} />
      <Route exact path="/:colonyAddress/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
    </div>
  </Switch>
));
