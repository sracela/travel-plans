import React from "react";
import { User } from "../../components";

const Users = ({ users, addUser, editUser, deleteUser }) => {
  return (
    <div>
      <h2>Users</h2>
      {/* <h3>Add New User</h3>
      <TripForm submit={addTrip} defaultValues={{}} /> */}
      <h3>All Users</h3>
      <ol>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            deleteUser={deleteUser}
            editUser={editUser}
          />
        ))}
      </ol>
    </div>
  );
};

export default Users;
