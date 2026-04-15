import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function TopNavbar() {
  const { user, logout } = useAuth();
  return <nav className="navbar bg-white border-bottom"><div className="container-fluid"><Link className="navbar-brand fw-bold" to={`/${user?.role || "login"}`}>HMS Portal</Link><div className="d-flex gap-2 align-items-center"><span className="small text-muted d-none d-md-inline">{user?.name}</span><button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button></div></div></nav>;
}
