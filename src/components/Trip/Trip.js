import React from "react";

const Trip = ({ trip }) => {
  return (
    <li>
      <p>Trip to <strong>{trip.destination}</strong></p>
      <p><small>Start Date: {trip.startDate}</small> - <small>End Date: {trip.endDate}</small></p>
      <p><small>User ID: {trip.createdBy}</small></p>
      <p><small>Comment: "{trip.comment}"</small></p>
      <hr />
    </li>
  );
};

export default Trip;
