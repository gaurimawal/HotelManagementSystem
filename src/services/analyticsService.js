import apiClient from "./apiClient";

export default {
  async getRevenueSeries() {
    const { data } = await apiClient.get("/api/analytics/revenue");
    return data;
  }
};
