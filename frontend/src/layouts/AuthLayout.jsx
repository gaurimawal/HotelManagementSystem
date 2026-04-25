import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-split">
      {/* Branding Panel */}
      <div className="auth-brand-panel">
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏨</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            color: "#d4a017",
            fontWeight: 700,
            marginBottom: "0.75rem",
            lineHeight: 1.2
          }}>
            Grand Hotel<br />
            <span style={{ color: "#e8eaf0" }}>Management</span>
          </h1>
          <p style={{ color: "#8b95a8", fontSize: "1rem", maxWidth: "320px", lineHeight: 1.6 }}>
            Elevating hospitality through intelligent management. Where luxury meets efficiency.
          </p>

          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "🛏️", label: "Smart Room Management" },
              { icon: "📅", label: "Seamless Booking System" },
              { icon: "📊", label: "Real-time Analytics" },
            ].map((f) => (
              <div key={f.label} style={{
                display: "flex", alignItems: "center", gap: "12px",
                background: "rgba(212,160,23,0.07)",
                border: "1px solid rgba(212,160,23,0.15)",
                borderRadius: "10px",
                padding: "12px 16px",
                textAlign: "left"
              }}>
                <span style={{ fontSize: "1.3rem" }}>{f.icon}</span>
                <span style={{ color: "#c8cdd6", fontSize: "0.9rem", fontWeight: 500 }}>{f.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "2.5rem",
            padding: "14px 20px",
            background: "rgba(212,160,23,0.08)",
            border: "1px solid rgba(212,160,23,0.2)",
            borderRadius: "10px",
            fontSize: "0.78rem",
            color: "#8b95a8",
            lineHeight: 1.7
          }}>
            <div style={{ fontWeight: 700, color: "#d4a017", marginBottom: "4px" }}>Demo Credentials</div>
            <div>admin@hms.com &nbsp;·&nbsp; staff@hms.com &nbsp;·&nbsp; customer@hms.com</div>
            <div style={{ color: "#d4a017" }}>Password: 123456</div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="auth-form-panel">
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
