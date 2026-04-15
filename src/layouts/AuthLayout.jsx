import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 auth-bg">
      <div className="card border-0 shadow-sm auth-card"><div className="card-body p-4"><Outlet /></div></div>
    </div>
  );
}
