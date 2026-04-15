import apiClient from "./apiClient";

export default {
  async getBookings() {
    const { data } = await apiClient.get("/api/staff/bookings");
    return data;
  },
  async updateBookingStatus(id, status) {
    const { data } = await apiClient.patch(`/api/staff/bookings/${id}/status`, { status });
    return data;
  },
  async updateRoomStatus(id, status) {
    const { data } = await apiClient.patch(`/api/staff/rooms/${id}/status`, { status });
    return data;
  },
  async getServiceRequests() {
    const { data } = await apiClient.get("/api/staff/requests");
    return data;
  }
};
