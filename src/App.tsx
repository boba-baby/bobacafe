import React from "react";
// import { css } from "@emotion/react";
import "./index.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorScan } from "./pages/ErrorScan";
import { Directory } from "./pages/Directory";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>

          <Route path="/directory">
            <Directory />
          </Route>
          <Route path="/errorscan">
            <ErrorScan />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
