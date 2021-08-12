import React, { useState, useEffect } from "react";
import tripService from "./services/trips";
import userService from "./services/users";
import loginService from "./services/login";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Home, Users, Trips } from "./components";
import SignInSide from "./components/SignInSide/SignInSide";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

/**
 * TODO: Material UI - Users
 * TODO: Material UI - Register
 * TODO: Material UI - Notification Component
 * TODO: Material UI - CALENDAR (Start date - End Date)
 * TODO: Material UI - Home (plan para un mes)
 * TODO: Cambiar a rutas relativos al menos compnents
 * 
 * TODO: Backend
 * 
 * TODO: Tests
 * TODO: Change to async/await
 * TODO: Tests
 * TODO: Add Redux
 * TODO: Users EDIT, DELETE, UPDATE
 * TODO: Login Authentication + Permisions
 * TODO: Tests
 * ?: Home, actual month and option to next month
 */

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const App = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trips, setTrips] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    tripService.getAll().then((initialTrips) => {
      setTrips(initialTrips);
    });
  }, []);

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });
  }, []);

  const onLogin = async (config) => {
    try {
      await loginService.login(config);
      // const user = await loginService.login(config);
      // setUser(user);
    } catch (exception) {
      console.log("Wrong credentials");
    }
    setUser(config);
    setIsLoggedIn(true);
    history.push("/");
  };

  const onLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const addTrip = (tripObject) => {
    tripService
      .create({ ...tripObject, id: Math.random().toString(36).substr(2, 9) })
      .then((response) => {
        setTrips(trips.concat(response));
      });
  };

  const deleteTrip = (id) => {
    if (window.confirm(`Do you really want to remove this trip?`)) {
      tripService.remove(id).then(() => {
        setTrips(trips.filter((trip) => trip.id !== id));
      });
    }
  };

  const editTrip = (id, tripObject) => {
    tripService.update(id, tripObject).then((response) => {
      setTrips(trips.map((trip) => (trip.id !== id ? trip : response)));
    });
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Switch>
        <Route
          path="/users"
          render={() =>
            isLoggedIn ? (
              <Users
                users={users}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/trips"
          render={() =>
            isLoggedIn ? (
              <Trips
                trips={trips}
                addTrip={addTrip}
                editTrip={editTrip}
                deleteTrip={deleteTrip}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login">
          {/* <Login onLogin={onLogin} />*/}
          <SignInSide onLogin={onLogin} />
        </Route>
        <Route
          path="/"
          render={() =>
            isLoggedIn ? (
              <Home 
              isLoggedIn={isLoggedIn}
              onLogout={onLogout}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Grid>
  );
};

export default App;
