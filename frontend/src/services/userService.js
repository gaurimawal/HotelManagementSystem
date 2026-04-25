import apiClient from "./apiClient";

export default {
  async getProfile() {
    const { data } = await apiClient.get("/api/users/me");
    return data;
  },
  async updateProfile(payload) {
    const { data } = await apiClient.put("/api/users/me", payload);
    return data;
  }
};
