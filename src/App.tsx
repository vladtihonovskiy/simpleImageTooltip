import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.module.scss";
import Main from "./Containers/Main/Main";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
