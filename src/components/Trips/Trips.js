import React, { useState } from "react";
import { Trip, TripForm } from "../../components";

const Trips = ({ trips, addTrip, editTrip, deleteTrip }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filterTrips = (trips) => {
    if (searchQuery === "") {
      return trips
    }
    return trips.filter(trip => trip.destination.includes(searchQuery))
  }


  const filteredTrips = filterTrips(trips)

  return (
    <div>
      <h2>Trips</h2>
      <h3>Add New Trip</h3>
      <TripForm submit={addTrip} defaultValues={{}} />
      <h3>All Trips</h3>
      <span>Filter by <strong>Destination</strong>: </span>
      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={"Porto"}/>
      <ol>
        {filteredTrips.map((trip) => (
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
