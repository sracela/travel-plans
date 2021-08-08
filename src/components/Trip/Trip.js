import React, { useState } from "react";
import { TripForm } from "../../components";

const Trip = ({ trip, deleteTrip, editTrip }) => {
  const [editMode, setEditMode] = useState(false);
  const defaultValues = {
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    comment: trip.comment,
  };

  const onEdit = (tripObject) => {
    setEditMode(false)
    editTrip(trip.id, tripObject)
  }
  if (editMode)
    return (
      <li>
        <TripForm submit={onEdit} defaultValues={defaultValues} />
        <div>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
        <hr />
      </li>
    );

  return (
    <li>
      <p>
        Trip to <strong>{trip.destination}</strong>
      </p>
      <p>
        <small>Start Date: {trip.startDate}</small> -{" "}
        <small>End Date: {trip.endDate}</small>
      </p>
      <p>
        <small>User ID: {trip.createdBy}</small>
      </p>
      <p>
        <small>Comment: "{trip.comment}"</small>
      </p>
      <div>
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => deleteTrip(trip.id)}>Delete</button>
      </div>
      <hr />
    </li>
  );
};

export default Trip;
