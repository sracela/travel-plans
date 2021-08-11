import React from "react";
import Layout from "../Layout/Layout";

const Home = ({ greeting, onLogout, isLoggedIn }) => {
  return (
    <Layout onLogout={onLogout} isLoggedIn={isLoggedIn}>
      {/* <p>{isLoggedIn ? `Hello ${user.username}` : "You are logged out!"}</p> */}
      {/* <h1>Welcome to Travel Plans App</h1> */}
      <h3>{greeting}</h3>
    </Layout>
  );
};

export default Home;
