import { useState } from "react";
import { useHistory } from "react-router";
import BASE_URL from "../util";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const resp = await fetch(`${BASE_URL}/users/login`, {
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

    props.setUser({
      token: info.token,
      id: info.user.id,
      username: info.user.username,
    });
    history.push("/");
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
          minLength={8}
          placeholder="Enter Password..."
        ></input>
        <button>Login</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
};

export default Login;
