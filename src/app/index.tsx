import * as React from "react";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { hot } from "react-hot-loader";
import OpenColony from "components/container/OpenColony";
import Dashboard from "components/container/Dashboard";

export const App = hot(module)(() => (
  <Switch>
    <div>
      <Route exact path="/" component={OpenColony} />
      <Route path="/:colonyAddress" component={Dashboard} />
    </div>
  </Switch>
));
