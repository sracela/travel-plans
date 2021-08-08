import React from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { Login, Home, Users, Trips, Nav } from "../components";

const App = () => {
  const isLoggedIn = true;
  return (
    <div>
    <Nav />
      <h1>Welcome to Travel Plans App</h1>
      <Switch>
        <Route
          path="/users"
          render={() => (isLoggedIn ? <Users /> : <Redirect to="/login" />)}
        />
        <Route
          path="/trips"
          render={() => (isLoggedIn ? <Trips /> : <Redirect to="/login" />)}
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home
            greeting={
              !isLoggedIn
                ? "Please Log in to see posted Blogs"
                : "Click on blogs in the navigation bar to see available blogs"
            }
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;