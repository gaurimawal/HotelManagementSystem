import apiClient from "./apiClient";

const analyticsService = {
  async getRevenueSeries() {
    const { data } = await apiClient.get("/api/analytics/revenue");
    return data;
  },
  async getRevenue() {
    const { data } = await apiClient.get("/api/analytics/revenue");
    return data;
  }
};

export default analyticsService;
