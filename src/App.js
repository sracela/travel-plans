import React, { useState, useEffect } from "react";
import tripService from "./services/trips";
import userService from "./services/users";
import loginService from "./services/login";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Login, Home, Users, Trips, Nav } from "./components";

/**
 *
 * TODO: Material UI
 * TODO: Notification Component
 * TODO: Start date - End Date
 * TODO: Home (plan para un mes)
 * TODO: Tests
 * TODO: Change to async/await
 * TODO: Tests
 * TODO: Add Redux
 * TODO: Users EDIT, DELETE, UPDATE
 * TODO: Login Authentication + Permisions
 * TODO: Tests
 * ?: Home, actual month and option to next month
 */

const App = () => {
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
    <div>
      <Nav isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <p>{isLoggedIn ? `Hello ${user.username}` : "You are logged out!"}</p>
      <h1>Welcome to Travel Plans App</h1>
      <Switch>
        <Route
          path="/users"
          render={() =>
            isLoggedIn ? <Users users={users} /> : <Redirect to="/login" />
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
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login">
          <Login onLogin={onLogin} />
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
