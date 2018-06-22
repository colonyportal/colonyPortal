import * as React from "react";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { hot } from "react-hot-loader";
import OpenColony from "components/container/OpenColony";
/*import TaskList from "components/container/TaskList";
import CreateNewTask from "components/container/CreateNewTask";
import ImportIssue from "components/presentation/ImportIssue";
import Dashboard from "components/container/Dashboard";
import Login from "components/container/Login";*/

export const App = hot(module)(() => (
  <Switch>
    <div>
      <Route exact path="/" component={OpenColony} />

      {/* TODO: Replace these paths with nested routes instead
      <Route exact path="/:colonyAddress" component={Dashboard} />
      <Route path="/:colonyAddress/import-issue" component={ImportIssue} />
      <Route path="/:colonyAddress/create-new-task" component={CreateNewTask} />
      <Route exact path="/:colonyAddress/tasks" component={TaskList} />
      <Route exact path="/login" component={Login} />*/}
    </div>
  </Switch>
));
