import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useUI } from "../context/useUI";
import Sidebar from "../components/navigation/Sidebar";
import TopNavbar from "../components/navigation/TopNavbar";
import Loader from "../components/common/Loader";
import AlertMessage from "../components/common/AlertMessage";

export default function DashboardLayout() {
  const { role } = useAuth();
  const { alert, globalLoading } = useUI();

  return (
    <div className="min-vh-100 bg-light">
      <TopNavbar />
      <div className="d-flex layout-stack">
        <Sidebar role={role} />
        <main className="flex-grow-1 p-3 p-md-4">
          {alert ? <AlertMessage message={alert.message} variant={alert.variant} /> : null}
          {globalLoading ? <Loader text="Loading..." /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
