import apiClient from "./apiClient";

export default {
  async createBooking(payload) {
    const { data } = await apiClient.post("/api/bookings", payload);
    return data;
  },
  async getMyBookings() {
    const { data } = await apiClient.get("/api/bookings/my");
    return data;
  },
  async cancelBooking(id) {
    const { data } = await apiClient.patch(`/api/bookings/${id}/cancel`);
    return data;
  }
};
