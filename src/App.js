import React, { useState, useEffect } from "react";
import tripService from "./services/trips";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Home, Users, Trips, Nav } from "./components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    tripService.getAll().then((initialTrips) => {
      setTrips(initialTrips);
    });
  }, []);

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
    tripService
      .update(id, tripObject)
      .then(response => {
        setTrips(trips.map(trip => trip.id !== id ? trip : response))
      })

    setTrips(
      trips.map((trip) => {
        if (trip.id === id) return { ...tripObject, id };
        return trip;
      })
    );
  };

  return (
    <div>
      <Nav handleLogin={() => setIsLoggedIn(!isLoggedIn)} />
      <p>{isLoggedIn ? "You are logged in!" : "You are logged out!"}</p>
      <h1>Welcome to Travel Plans App</h1>
      <Switch>
        <Route
          path="/users"
          render={() => (isLoggedIn ? <Users /> : <Redirect to="/login" />)}
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
