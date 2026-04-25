export const mockUsers = [
  { id: 1, name: "Alice Customer", email: "customer@hms.com", password: "123456", role: "customer" },
  { id: 2, name: "Bob Staff", email: "staff@hms.com", password: "123456", role: "staff" },
  { id: 3, name: "Carol Admin", email: "admin@hms.com", password: "123456", role: "admin" }
];
export const roomInventory = [
  { id: 101, roomNo: "A-101", type: "Deluxe", price: 180, status: "Available" },
  { id: 102, roomNo: "A-102", type: "Suite", price: 280, status: "Occupied" },
  { id: 103, roomNo: "B-201", type: "Standard", price: 120, status: "Maintenance" }
];
export const bookingHistory = [{ id: 1, roomNo: "A-101", checkIn: "2026-04-01", checkOut: "2026-04-03", status: "Confirmed", amount: 360 }];
export const bookings = [{ id: 71, guest: "Alice", roomNo: "A-101", status: "Check-in Pending", checkIn: "2026-04-20", checkOut: "2026-04-24" }];
export const serviceRequests = [{ id: 501, roomNo: "A-101", request: "Extra towels", priority: "Normal", status: "Open" }];
export const users = [{ id: 1, name: "Alice Customer", role: "customer", email: "customer@hms.com", phone: "555-1000" }];
export const adminKpis = [{ label: "Revenue", value: "$128,400", trend: "+10.2%" }, { label: "Occupancy", value: "82%", trend: "+4.1%" }];
export const revenueSeries = [{ month: "Jan", revenue: 20000, occupancy: 68 }, { month: "Feb", revenue: 24000, occupancy: 71 }, { month: "Mar", revenue: 26500, occupancy: 76 }];
