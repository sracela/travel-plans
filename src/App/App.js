import React, { useState } from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { Login, Home, Users, Trips, Nav } from "../components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Nav handleLogin={() => setIsLoggedIn(!isLoggedIn)}/>
      <p>{isLoggedIn ? 'You are logged in!' : 'You are logged out!'}</p>
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
