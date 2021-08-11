import React from "react";
import { User } from "../../components";
import Layout from "../Layout/Layout";

const Users = ({ users, addUser, editUser, deleteUser, onLogout, isLoggedIn }) => {
  return (
    <Layout onLogout={onLogout} isLoggedIn={isLoggedIn}>
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
    </Layout>
  );
};

export default Users;
