import React from "react";

const User = ({ user, deleteUser, editUser }) => {
  // const [editMode, setEditMode] = useState(false);
  // const defaultValues = {
  //   destination: trip.destination,
  //   startDate: trip.startDate,
  //   endDate: trip.endDate,
  //   comment: trip.comment,
  // };

  // const onEdit = (tripObject) => {
  //   setEditMode(false)
  //   editTrip(trip.id, tripObject)
  // }
  // if (editMode)
  //   return (
  //     <li>
  //       <TripForm submit={onEdit} defaultValues={defaultValues} />
  //       <div>
  //         <button onClick={() => setEditMode(false)}>Cancel</button>
  //       </div>
  //       <hr />
  //     </li>
  //   );

  return (
    <li>
      <p>
        Name: <strong>{user.username}</strong>
      </p>
      <p>
        Type: <strong>{user.type}</strong>
      </p>
      <p>Trips:</p>
      <ol>
        {user.trips.map((trip) => <li>{trip.destination}</li>)}
      </ol>
      <div>
        {/* <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => deleteTrip(trip.id)}>Delete</button> */}
      </div>
      <hr />
    </li>
  );
};

export default User;
