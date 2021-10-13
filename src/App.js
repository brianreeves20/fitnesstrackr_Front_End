import { useEffect } from "react";
import { Route } from "react-router";
import "./App.css";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Login from "./components/Login";
import MyRoutines from "./components/MyRoutines";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Routines from "./components/Routines";

function App() {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  // useEffect(()=>{
  //   const fetchUser = async ()=>{
  //     const token = localStorage.getItem("token");
  //     if(!token){
  //       return
  //     }
  //     const resp
  //   }
  // })
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/activities">
        <Activities />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/my-routines">
        <MyRoutines />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/routines">
        <Routines />
      </Route>
    </>
  );
}

export default App;
