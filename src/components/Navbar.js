import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>|<Link to="/routines">Routines</Link>|
      <Link to="/my-routines">My Routines</Link>|
      <Link to="/activities">Activities</Link>|<Link to="/login">Login</Link>|
      <Link to="/register">Register</Link>
    </>
  );
};

export default Navbar;
