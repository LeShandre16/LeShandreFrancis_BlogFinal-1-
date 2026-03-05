import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/JTech_logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-wrap">
          <img src={logo} alt="JTech Logo" className="logo-img" />
          <span className="logo-text">JTech</span>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Log in</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/create">Create</Link></li>
      </ul>
    </nav>
  );
}
