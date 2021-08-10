import React from "react";
import { useField } from "../../hooks";

const Login = ({ onLogin }) => {
  const { reset: resetUsername, ...username } = useField("text", "");
  const { reset: resetPassword, ...password } = useField("password", "");

  const handleLogin = async (event) => {
    event.preventDefault();
    await onLogin({
      username: username.value,
      password: password.value,
    });
    resetUsername(resetPassword());
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
