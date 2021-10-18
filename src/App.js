import { useEffect, useState } from "react";
import { Route } from "react-router";
import "./App.css";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Login from "./components/Login";
import MyRoutines from "./components/MyRoutines";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Routines from "./components/Routines";
import BASE_URL from "./util";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setUser(null);
    }
    const fetchUser = async () => {
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();

      setUser({
        id: data.id,
        username: data.username,
        token,
      });
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {user && <h2>Welcome {user.username}</h2>}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/activities">
        <Activities user={user} />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} />
      </Route>
      <Route path="/my-routines">
        <MyRoutines user={user} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
      <Route path="/routines">
        <Routines user={user} />
      </Route>
    </div>
  );
}

export default App;
