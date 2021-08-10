import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn, onLogout }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        {isLoggedIn ? (
          <Link to="/login" onClick={onLogout}>Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  );
};

export default Nav;
