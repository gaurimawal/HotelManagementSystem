import apiClient from "./apiClient";

export default {
  async getKpis() {
    const { data } = await apiClient.get("/api/admin/kpis");
    return data;
  },
  async getUsers() {
    const { data } = await apiClient.get("/api/admin/users");
    return data;
  },
  async updateUserRole(id, role) {
    const { data } = await apiClient.patch(`/api/admin/users/${id}/role`, { role });
    return data;
  },
  async getAllBookings() {
    const { data } = await apiClient.get("/api/admin/bookings");
    return data;
  },
  async createRoom(payload) {
    const { data } = await apiClient.post("/api/admin/rooms", payload);
    return data;
  },
  async updateRoom(id, payload) {
    const { data } = await apiClient.put(`/api/admin/rooms/${id}`, payload);
    return data;
  },
  async deleteRoom(id) {
    const { data } = await apiClient.delete(`/api/admin/rooms/${id}`);
    return data;
  }
};
