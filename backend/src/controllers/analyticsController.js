import Booking from "../models/Booking.js";

export const getRevenueAnalytics = async (_req, res) => {
  const data = await Booking.aggregate([
    { $match: { status: { $ne: "Cancelled" } } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        revenue: { $sum: "$totalAmount" },
        bookings: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const monthMap = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const formatted = data.map((d) => ({
    month: monthMap[d._id - 1],
    revenue: d.revenue,
    bookings: d.bookings
  }));

  res.json(formatted);
};