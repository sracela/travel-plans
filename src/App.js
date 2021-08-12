import React, { useState, useEffect } from "react";
import tripService from "./services/trips";
import userService from "./services/users";
import loginService from "./services/login";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Home, Users, Trips, Notification } from "./components";
import SignInSide from "./components/SignInSide/SignInSide";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

/**
 * TODO: Material UI - Create Sign Up and pass Sign In and Sign Up to Login
 * TODO: Material UI - Home eliminar edit en los trips de ahí
 *
 * TODO: Backend
 *
 * TODO: Tests
 * TODO: Change to async/await
 * TODO: Tests
 * TODO: Add Redux
 * TODO: Users EDIT, DELETE, UPDATE
 * TODO: Material UI - Table User con actions y toggable para CRUD + Add User.
 * TODO: Login Authentication + Permisions
 * TODO: Tests
 * 
 * 
 * ?: Cambiar a rutas relativos al menos components
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
  const [openNotification, setOpenNotification] = useState(false);
  const [notification, setNotification] = useState({
    status: "success",
    message: "",
  });
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
      setOpenNotification(true);
      setNotification({
        status: "error",
        message: "Something went wrong during Log In",
      });
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
        setOpenNotification(true);
        setNotification({
          status: "success",
          message: "Trip created successfully!",
        });
      })
      .catch((e) => {
        setOpenNotification(true);
        setNotification({
          status: "error",
          message: "Something went wrong adding a New Trip",
        });
      });
  };

  const deleteTrip = (id) => {
    if (window.confirm(`Do you really want to remove this trip?`)) {
      tripService
        .remove(id)
        .then(() => {
          setTrips(trips.filter((trip) => trip.id !== id));
          setOpenNotification(true);
          setNotification({
            status: "success",
            message: "Trip deleted successfully!",
          });
        })
        .catch((e) => {
          setOpenNotification(true);
          setNotification({
            status: "error",
            message: "Something went wrong deleting the trip!",
          });
        });
    }
  };

  const editTrip = (id, tripObject) => {
    tripService
      .update(id, tripObject)
      .then((response) => {
        setTrips(trips.map((trip) => (trip.id !== id ? trip : response)));
        setOpenNotification(true);
        setNotification({
          status: "success",
          message: "Trip edited successfully!",
        });
      })
      .catch((e) => {
        setOpenNotification(true);
        setNotification({
          status: "error",
          message: "Something went wrong editing the trip!",
        });
      });
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        notification={notification}
      />
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
              <Home trips={trips} isLoggedIn={isLoggedIn} onLogout={onLogout} 
              editTrip={editTrip}
              deleteTrip={deleteTrip} />
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
