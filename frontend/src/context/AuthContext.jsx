import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AuthContext } from "./AuthContextDef";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("hms_token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("hms_user") || "null"));
  const [loading, setLoading] = useState(false);

  const login = async (values) => {
    setLoading(true);
    try {
      const res = await authService.login(values);
      localStorage.setItem("hms_token", res.token);
      localStorage.setItem("hms_user", JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
      navigate(`/${res.user.role}`);
    } finally {
      setLoading(false);
    }
  };

  const register = (payload) => authService.register(payload);

  const logout = () => {
    localStorage.removeItem("hms_token");
    localStorage.removeItem("hms_user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const value = { token, user, role: user?.role, isAuthenticated: !!token, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
