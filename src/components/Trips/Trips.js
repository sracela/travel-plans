import React, { useState } from "react";
import { Trip, TripForm } from "../../components";
import Layout from "../Layout/Layout";
import Grid from "@material-ui/core/Grid";

const Trips = ({
  trips,
  addTrip,
  editTrip,
  deleteTrip,
  onLogout,
  isLoggedIn,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterTrips = (trips) => {
    if (searchQuery === "") {
      return trips;
    }
    return trips.filter((trip) =>
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredTrips = filterTrips(trips);

  return (
    <Layout onLogout={onLogout} isLoggedIn={isLoggedIn}>
      <Grid container 
  direction="column" spacing={1}>
        <Grid item>
          <h2>Trips</h2>
        <h3>Add New Trip</h3>
          <TripForm submit={addTrip} defaultValues={{}} />
          
        <h3>All Trips</h3>
        <span>
          Filter by <strong>Destination</strong>:{" "}
        </span>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={"Porto"}
        />
        </Grid>

        <Grid item> 
        <ol>
          {filteredTrips.length !== 0 &&
            filteredTrips.map((trip) => (
              <Trip
                key={trip.id}
                trip={trip}
                deleteTrip={deleteTrip}
                editTrip={editTrip}
              />
            ))}
        </ol>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Trips;
