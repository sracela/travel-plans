import React, { useState } from "react";

const NewTripForm = ({ trips, setTrips }) => {
  const [newTrip, setNewTrip] = useState("");
  const addTrip = (event) => {
    event.preventDefault();
    const tripObject = {
      destination: newTrip,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
      createdBy: 1,
    };

    setTrips(trips.concat(tripObject));
    setNewTrip("");
  };

  const handleTripChange = (event) => {
    setNewTrip(event.target.value);
  };
  return (
    <div>
      <br />
      <h3>Add New Trip</h3>
      <form onSubmit={addTrip}>
        <input
          value={newTrip}
          onChange={handleTripChange}
          placeholder="Destination Name"
        />
        <button type="submit">Add Trip</button>
      </form>
      <br />
    </div>
  );
};

export default NewTripForm;
