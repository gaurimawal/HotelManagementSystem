import { adminKpis, bookingHistory, bookings, revenueSeries, roomInventory, serviceRequests, users } from "../utils/mockData";

const delayed = (x) => new Promise((r) => setTimeout(() => r(x), 250));

export default {
  getRooms: () => delayed(roomInventory),
  getBookingHistory: () => delayed(bookingHistory),
  getBookings: () => delayed(bookings),
  getServiceRequests: () => delayed(serviceRequests),
  getUsers: () => delayed(users),
  getAdminKpis: () => delayed(adminKpis),
  getRevenueSeries: () => delayed(revenueSeries)
};
