import apiClient from "./apiClient";

export default {
  async getRooms(params = {}) {
    const { data } = await apiClient.get("/api/rooms", { params });
    return data;
  },
  async getRoomById(id) {
    const { data } = await apiClient.get(`/api/rooms/${id}`);
    return data;
  }
};
