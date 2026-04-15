import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import ServiceRequest from "../models/ServiceRequest.js";

export const getStaffBookings = async (_req, res) => {
  const bookings = await Booking.find().populate("user room");
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = status || booking.status;
  await booking.save();
  res.json(booking);
};

export const updateRoomStatus = async (req, res) => {
  const { status } = req.body;
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: "Room not found" });

  room.status = status || room.status;
  await room.save();
  res.json(room);
};

export const getServiceRequests = async (_req, res) => {
  const requests = await ServiceRequest.find().populate("room booking assignedStaff");
  res.json(requests);
};