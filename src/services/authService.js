import apiClient from "./apiClient";

const authService = {
  async login({ email, password }) {
    const { data } = await apiClient.post("/api/auth/login", { email, password });
    return data;
  },
  async register(payload) {
    const { data } = await apiClient.post("/api/auth/register", payload);
    return data;
  },
  async forgotPassword(email) {
    const { data } = await apiClient.post("/api/auth/forgot-password", { email });
    return data;
  }
};

export default authService;
