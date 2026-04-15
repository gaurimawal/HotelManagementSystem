import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

export const getKpis = async (_req, res) => {
  const totalBookings = await Booking.countDocuments();
  const occupiedRooms = await Room.countDocuments({ status: "Occupied" });
  const totalRooms = await Room.countDocuments();
  const revenueAgg = await Booking.aggregate([
    { $match: { status: { $ne: "Cancelled" } } },
    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
  ]);

  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;
  const occupancy = totalRooms ? ((occupiedRooms / totalRooms) * 100).toFixed(1) : 0;

  res.json({
    totalRevenue,
    occupancy: Number(occupancy),
    totalBookings,
    totalRooms
  });
};

export const createRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
};

export const updateRoom = async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};

export const deleteRoom = async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json({ message: "Room deleted" });
};

export const getUsers = async (_req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role || user.role;
  await user.save();
  res.json({ message: "User updated", user });
};

export const getAllBookings = async (_req, res) => {
  const bookings = await Booking.find().populate("user room");
  res.json(bookings);
};