import * as React from "react";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { hot } from "react-hot-loader";
import OpenColony from "app/containers/OpenColony";
import TasksPage from "app/containers/TasksPage";
import MyTasksPage from "app/components/MyTasksPage";
import CreateNewTask from 'app/containers/CreateNewTask';
//import GithubIssueList from "app/containers/GithubIssueList";
import ImportTaskPage from "app/components/ImportTaskPage";
import Dashboard from "app/containers/Dashboard";
import Login from "app/containers/Login";

export const App = hot(module)(() => (
  <Switch>
    <div>
      <Route exact path="/" component={OpenColony} />
      <Route path="/:colonyAddress/my-tasks" component={MyTasksPage} />
      <Route path="/:colonyAddress/import-task" component={ImportTaskPage} />
      <Route path="/:colonyAddress/create-new-task" component={CreateNewTask} />
      <Route exact path="/:colonyAddress/tasks" component={TasksPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/:colonyAddress" component={Dashboard} />
    </div>
  </Switch>
));
