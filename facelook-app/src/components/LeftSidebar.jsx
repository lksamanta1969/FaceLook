import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
export default function LeftSidebar() {
 const profileImage = localStorage.getItem("profileImage");
const name = localStorage.getItem("name") || "Lakshmi Kanta Samanta";

 const menus = [
  { name: "🏠 Home", path: "/home" },
  { name: "👤 Profile", path: "/profile" },
  { name: "👥 Friends", path: "/friends" },
  { name: "💬 Messages", path: "/messages" },
  { name: "🖼 Photos", path: "/photos" },
  { name: "🎥 Videos", path: "/videos" },
  { name: "🛒 Marketplace", path: "/marketplace" },
  { name: "📅 Events", path: "/events" },
  { name: "⚙ Settings", path: "/settings" }
];

  return (
    <div className="leftSidebar">
      <div className="profileBox">

      {profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    className="profileImage"
  />
) : (
  <div style={{ fontSize: "80px" }}>👤</div>
)}  

        <h3>{name}</h3>

        <p>Senior Civil Engineer</p>
      </div>

      <ul className="menuList">
     {menus.map((item) => (
  <li key={item.path}>
   
   <NavLink
  to={item.path}
  className={({ isActive }) => (isActive ? "active" : "")}
  style={{
    textDecoration: "none",
    color: "inherit",
    display: "block",
    padding: "8px 0"
  }}
>
      {item.name}
    </NavLink>
  </li>
))}   
      </ul>
    </div>
  );
}