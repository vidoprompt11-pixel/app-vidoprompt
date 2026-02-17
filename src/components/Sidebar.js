import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>PromptHero</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/platform-buttons"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          🔗 Try Buttons
        </NavLink>
      </nav>
    </aside>
  );
}
