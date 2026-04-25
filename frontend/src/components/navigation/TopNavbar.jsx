import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function TopNavbar() {
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <nav className="top-navbar">
      {/* Brand */}
      <Link to={`/${user?.role || "login"}`} style={{ textDecoration: "none" }}>
        <div className="brand">🏨 HMS Portal</div>
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User Info */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "99px",
            padding: "5px 14px 5px 5px"
          }}>
            <div className="avatar avatar-sm">{initials}</div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{user.name}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "capitalize" }}>{user.role}</div>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.2)";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.1)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
            }}
          >
            <span>⬅</span> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
