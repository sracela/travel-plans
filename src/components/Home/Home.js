import moment from "moment";
import React from "react";
import Layout from "../Layout/Layout";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Trip } from "../../components";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  filterField: {
    minWidth: '350px'
  }
}));

const Home = ({ trips, onLogout, isLoggedIn, deleteTrip, editTrip }) => {
  const classes = useStyles();

  const filterTrips = (trips) => {
    const currentMonth= moment().format('M');
    console.log("currentMonth", currentMonth)
    return trips.filter((trip) => {
      const tripMonth = moment(trip.startDate).format('M')
      console.log("tripMonth", tripMonth)
      return tripMonth === currentMonth
    })
  };

  const filteredTrips = filterTrips(trips);

  return (
    <Layout onLogout={onLogout} isLoggedIn={isLoggedIn}>
      {/* <p>{isLoggedIn ? `Hello ${user.username}` : "You are logged out!"}</p> */}
      {/* */}
      <h1>Welcome to Travel Plans App</h1>
      
      <h2>Next Month Trips...</h2>

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
    </Layout>
  );
};

export default Home;
