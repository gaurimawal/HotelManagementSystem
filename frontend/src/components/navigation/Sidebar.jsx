import { NavLink } from "react-router-dom";

const menu = {
  customer: [
    { to: "/customer", label: "Dashboard", icon: "🏠" },
    { to: "/customer/rooms", label: "Browse Rooms", icon: "🛏️" },
    { to: "/customer/bookings", label: "My Bookings", icon: "📅" },
    { to: "/profile", label: "My Profile", icon: "👤" },
  ],
  staff: [
    { to: "/staff", label: "Dashboard", icon: "🏠" },
    { to: "/staff/rooms", label: "Room Status", icon: "🛏️" },
    { to: "/staff/bookings", label: "Bookings", icon: "📅" },
    { to: "/staff/requests", label: "Service Requests", icon: "🔧" },
    { to: "/profile", label: "My Profile", icon: "👤" },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/rooms", label: "Room Management", icon: "🛏️" },
    { to: "/admin/users", label: "Users", icon: "👥" },
    { to: "/admin/bookings", label: "Booking Overview", icon: "📅" },
    { to: "/admin/analytics", label: "Analytics", icon: "📈" },
    { to: "/profile", label: "My Profile", icon: "👤" },
  ],
};

const roleMeta = {
  admin:    { label: "Administrator", color: "var(--gold)" },
  staff:    { label: "Staff Member",  color: "var(--info)" },
  customer: { label: "Guest",         color: "#a78bfa" },
};

export default function Sidebar({ role }) {
  const items = menu[role] || [];
  const meta = roleMeta[role] || {};

  return (
    <aside className="sidebar">
      {/* Role Badge */}
      <div style={{ padding: "0 16px 16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: meta.color,
            boxShadow: `0 0 8px ${meta.color}`
          }} />
          <div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {meta.label}
            </div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ marginTop: "12px" }}>
        <div className="sidebar-section-label">Navigation</div>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${role}`}
            className={({ isActive }) => `sidebar-item${isActive ? " active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
