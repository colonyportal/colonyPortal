import * as React from "react";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { hot } from "react-hot-loader";
import OpenColony from "components/container/OpenColony";
import TasksPage from "components/container/TasksPage";
import MyTasksPage from "components/presentation/MyTasksPage";
import CreateNewTask from "components/container/CreateNewTask";
import ImportTaskPage from "components/presentation/ImportTaskPage";
import Dashboard from "components/container/Dashboard";
import Login from "components/container/Login";

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
