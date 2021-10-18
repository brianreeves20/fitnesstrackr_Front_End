import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");

    props.setUser(null);
  };
  return (
    <div className="Navbar">
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>
      |
      <Link to="/routines" style={{ color: "white" }}>
        Routines
      </Link>
      |
      {props.user && (
        <>
          <Link to="/my-routines" style={{ color: "white" }}>
            My Routines
          </Link>
          |
        </>
      )}
      <Link to="/activities" style={{ color: "white" }}>
        Activities
      </Link>
      |
      {!props.user && (
        <>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
          |
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </>
      )}
      {props.user && (
        <>
          <Link onClick={handleLogout} to="/" style={{ color: "white" }}>
            Logout
          </Link>
        </>
      )}
      <h2>Fitness Trackr</h2>
    </div>
  );
};

export default Navbar;
