import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";

export default function LeftSidebar() {
  const profileImage = localStorage.getItem("profileImage");

  const name =
    localStorage.getItem("name") || "Lakshmi Kanta Samanta";

  const designation =
    localStorage.getItem("designation") ||
    "Senior Civil Engineer";

  const menus = [
    { name: "🏠 Home", path: "/home" },
    { name: "👤 Profile", path: "/profile" },
    { name: "👥 Friends", path: "/friends" },
    { name: "💬 Messages", path: "/messages" },
    { name: "🖼 Photos", path: "/photos" },
    { name: "🎥 Videos", path: "/videos" },
    { name: "🛒 Marketplace", path: "/marketplace" },
    { name: "📅 Events", path: "/events" },
    { name: "⚙ Settings", path: "/settings" },
  ];

  return (
    <aside className="leftSidebar">
      {/* Profile */}
      <div className="profileBox">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="profileImage"
          />
        ) : (
          <div
            className="profileImage"
            style={{ fontSize: "60px" }}
          >
            👤
          </div>
        )}

        <h3>{name}</h3>
        <p>{designation}</p>
      </div>

      {/* Social Links */}
      <div className="socialSection">
        <h4>🌐 Social Links</h4>

        <div
          className="social-card"
          onClick={() =>
            window.open("https://www.facebook.com", "_blank")
          }
        >
          📘 Facebook
        </div>

        <div
          className="social-card"
          onClick={() =>
            window.open("https://www.instagram.com", "_blank")
          }
        >
          📷 Instagram
        </div>

        <div
          className="social-card"
          onClick={() =>
            window.open("https://web.whatsapp.com", "_blank")
          }
        >
          💬 WhatsApp
        </div>

        <div
          className="social-card"
          onClick={() =>
            window.open("https://www.linkedin.com", "_blank")
          }
        >
          💼 LinkedIn
        </div>

        <div
          className="social-card"
          onClick={() =>
            window.open("https://www.youtube.com", "_blank")
          }
        >
          ▶️ YouTube
        </div>

        <div
          className="social-card"
          onClick={() =>
            window.open("https://x.com", "_blank")
          }
        >
          ❌ X (Twitter)
        </div>
      </div>

      {/* Menu */}
      <ul className="menuList">
        {menus.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}