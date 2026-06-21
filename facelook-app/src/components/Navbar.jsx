import "./Navbar.css";
import logo from "../logo.png";
import {
  FaHome,
  FaUserFriends,
  FaFacebookMessenger,
  FaBell,
  FaMoon,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="navbar">
      {/* Left */}
      <div className="nav-left">
        <div className="logo">
          <img src={logo} alt="FaceLook Logo" />
        </div>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            className="search"
            type="text"
            placeholder="Search FaceLook"
          />
        </div>
      </div>

      {/* Center */}
      <div className="nav-center">
        <FaHome className="nav-icon active" />
        <FaUserFriends className="nav-icon" />
        <FaFacebookMessenger className="nav-icon" />
      </div>

      {/* Right */}
      <div className="nav-right">
        <div className="notify">
          <FaBell className="nav-icon" />
          <span className="badge">3</span>
        </div>

        <FaMoon className="nav-icon" />

        <img
          className="avatar"
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
        />
      </div>
    </div>
  );
}