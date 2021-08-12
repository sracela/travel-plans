import React, { useState } from "react";
import { Trip, TripForm } from "../../components";

import Layout from "../Layout/Layout";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  filterField: {
    minWidth: '350px'
  }
}));

const Trips = ({
  trips,
  addTrip,
  editTrip,
  deleteTrip,
  onLogout,
  isLoggedIn,
}) => {
  const classes = useStyles();
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
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <h2>Trips</h2>
          <h3>Add New Trip</h3>
          <TripForm submit={addTrip} defaultValues={{}} />

          <h3>All Trips</h3>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <TextField
                id="filled-search"
                label="Filter by Destination"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={classes.filterField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {filteredTrips.length !== 0 &&
              filteredTrips.map((trip) => (
                <Trip
                  key={trip.id}
                  trip={trip}
                  deleteTrip={deleteTrip}
                  editTrip={editTrip}
                />
              ))}
          </Grid>
        </Container>
      </Grid>
    </Layout>
  );
};

export default Trips;
