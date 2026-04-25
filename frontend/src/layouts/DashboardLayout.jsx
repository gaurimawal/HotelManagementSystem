import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useUI } from "../context/useUI";
import Sidebar from "../components/navigation/Sidebar";
import TopNavbar from "../components/navigation/TopNavbar";

export default function DashboardLayout() {
  const { role } = useAuth();
  const { alert, globalLoading } = useUI();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <TopNavbar />
      <div className="d-flex layout-stack">
        <Sidebar role={role} />
        <main style={{ flexGrow: 1, padding: "1.75rem", maxWidth: "100%", overflow: "hidden" }}>
          {alert && (
            <div className={`alert-dark ${alert.variant === "danger" ? "error" : alert.variant} fade-in`}
              style={{ marginBottom: "1.25rem" }}>
              <span>{alert.variant === "danger" ? "⚠️" : alert.variant === "success" ? "✅" : "ℹ️"}</span>
              {alert.message}
            </div>
          )}
          {globalLoading ? (
            <div className="loader-overlay">
              <div className="spinner-ring" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="fade-in">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
