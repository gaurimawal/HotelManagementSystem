import { NavLink } from "react-router-dom";
const menu = {
  customer: [{ to: "/customer", label: "Dashboard" }, { to: "/customer/rooms", label: "Rooms" }, { to: "/customer/bookings", label: "Bookings" }, { to: "/profile", label: "Profile" }],
  staff: [{ to: "/staff", label: "Dashboard" }, { to: "/staff/rooms", label: "Room Status" }, { to: "/staff/bookings", label: "Bookings" }, { to: "/staff/requests", label: "Requests" }, { to: "/profile", label: "Profile" }],
  admin: [{ to: "/admin", label: "Dashboard" }, { to: "/admin/rooms", label: "Rooms" }, { to: "/admin/users", label: "Users" }, { to: "/admin/bookings", label: "Bookings" }, { to: "/admin/analytics", label: "Analytics" }, { to: "/profile", label: "Profile" }]
};
export default function Sidebar({ role }) {
  return <aside className="sidebar bg-white border-end p-3"><div className="nav nav-pills flex-column gap-1">{(menu[role] || []).map((item) => <NavLink key={item.to} to={item.to} end={item.to === `/${role}`} className={({ isActive }) => `nav-link ${isActive ? "active" : "link-dark"}`}>{item.label}</NavLink>)}</div></aside>;
}
