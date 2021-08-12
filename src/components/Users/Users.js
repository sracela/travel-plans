import React from "react";
import { User } from "../../components";
import Layout from "../Layout/Layout";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(username, id, type, tripsLength) {
  return { username, id, type, tripsLength};
}

const Users = ({ users, addUser, editUser, deleteUser, onLogout, isLoggedIn }) => {
  const classes = useStyles();
  const rows = users.map((user) => createData(user.username, user.id, user.type, user.trips.length))

  return (
    <Layout onLogout={onLogout} isLoggedIn={isLoggedIn}>
      <h2>Users</h2>
      {/* <h3>Add New User</h3>
      <TripForm submit={addTrip} defaultValues={{}} /> */}
      <h3>All Users</h3>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell align="right"><strong>ID</strong></TableCell>
            <TableCell align="right"><strong>Role</strong></TableCell>
            <TableCell align="right"><strong>Nº Trips</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.username}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.tripsLength}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {/* <ol>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            deleteUser={deleteUser}
            editUser={editUser}
          />
        ))}
      </ol> */}
    </Layout>
  );
};

export default Users;
