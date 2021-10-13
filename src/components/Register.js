import { useState } from "react";
import BASE_URL from "../util";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const resp = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await resp.json();

    if (info.error) {
      return setErrorMessage(info.message);
    }

    localStorage.setItem("token", info.token);

    setToken(info.token);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Enter Username..."
        ></input>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter Password..."
        ></input>
        <button>Register</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
};

export default Register;
