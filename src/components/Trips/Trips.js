import React from "react";
import { Trip, NewTripForm } from "../../components";

const Trips = ({ trips, setTrips }) => {
  return (
    <div>
      <h2>Trips</h2>
      <NewTripForm trips={trips} setTrips={setTrips} />
      <ol>
        {trips.map((trip) => (
          <Trip key={trip.id} trip={trip} />
        ))}
      </ol>
    </div>
  );
};

export default Trips;
