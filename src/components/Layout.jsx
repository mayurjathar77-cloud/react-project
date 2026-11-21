import { NavLink, Outlet } from "react-router";

const navigation = [
  { to: "/", label: "Dashboard", icon: "DB", end: true },
  { to: "/students", label: "Students", icon: "ST" },
  { to: "/courses", label: "Courses", icon: "CO" },
  { to: "/attendance", label: "Attendance", icon: "AT" },
  { to: "/fees", label: "Fees", icon: "FE" },
  { to: "/reports", label: "Reports", icon: "RP" },
  { to: "/settings", label: "Settings", icon: "SE" },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <strong>ScholarDesk</strong>
            <span>Student management</span>
          </div>
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="online-dot" />
          <span>All changes saved locally</span>
        </div>
      </aside>
      <div className="main-panel">
        <header className="topbar">
          <span>Education / <strong>Management portal</strong></span>
          <div className="profile-chip">
            <div className="avatar">AD</div>
            <div><strong>Administrator</strong><small>School admin</small></div>
          </div>
        </header>
        <main className="page-content"><Outlet /></main>
        <footer className="footer">ScholarDesk · Student management made simple</footer>
      </div>
    </div>
  );
}