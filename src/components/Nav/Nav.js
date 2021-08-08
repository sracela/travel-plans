import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ greeting }) => {
  return (
    <ul>
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/users">
          Users
        </Link>
      </li>
      <li>
        <Link to="/trips">
          Trips
        </Link>
      </li>
      <li>
        <Link to="/login">
          Login/Logout
        </Link>
      </li>
    </ul>
  );
};

export default Nav;