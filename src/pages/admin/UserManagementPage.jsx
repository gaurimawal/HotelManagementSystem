import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

export default function UserManagementPage() {
  const [rows, setRows] = useState([]);
  const load = () => adminService.getUsers().then(setRows).catch(() => setRows([]));
  useEffect(() => { load(); }, []);

  const updateRole = async (id, role) => {
    await adminService.updateUserRole(id, role);
    load();
  };

  return <div className="card border-0 shadow-sm"><div className="card-body"><h5>User Management</h5><table className="table"><thead><tr><th>Name</th><th>Role</th><th>Email</th></tr></thead><tbody>{rows.map((r) => <tr key={r._id}><td>{r.name}</td><td><select className="form-select" value={r.role} onChange={(e) => updateRole(r._id, e.target.value)}><option value="customer">customer</option><option value="staff">staff</option><option value="admin">admin</option></select></td><td>{r.email}</td></tr>)}</tbody></table></div></div>;
}
