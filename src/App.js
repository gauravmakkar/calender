import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";

import Month from "./components/Month";

export default class App extends React.Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route path="/:year/:month" component={Month} />
            <Route path="/" exact component={Month} />
          </Switch>
        </HashRouter>

    );
  }
}
