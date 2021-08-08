import React from "react";
import { Trip, TripForm } from "../../components";

const Trips = ({ trips, addTrip, editTrip, deleteTrip }) => {

  return (
    <div>
      <h2>Trips</h2>
      <h3>Add New Trip</h3>
      <TripForm submit={addTrip} defaultValues={{}} />
      <h3>All Trips</h3>
      <ol>
        {trips.map((trip) => (
          <Trip
            key={trip.id}
            trip={trip}
            deleteTrip={deleteTrip}
            editTrip={editTrip}
          />
        ))}
      </ol>
    </div>
  );
};

export default Trips;
