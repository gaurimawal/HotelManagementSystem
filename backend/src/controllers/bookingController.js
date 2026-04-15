import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import calculateBookingAmount from "../utils/calculateBookingAmount.js";

export const createBooking = async (req, res) => {
  const { roomId, checkIn, checkOut } = req.body;

  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: "Room not found" });

  if (room.status !== "Available") {
    return res.status(400).json({ message: "Room is not available" });
  }

  const totalAmount = calculateBookingAmount(room.price, checkIn, checkOut);
  if (totalAmount <= 0) return res.status(400).json({ message: "Invalid dates" });

  const invoiceNo = `INV-${Date.now()}`;

  const booking = await Booking.create({
    user: req.user._id,
    room: room._id,
    checkIn,
    checkOut,
    totalAmount,
    invoiceNo,
    status: "Confirmed"
  });

  room.status = "Occupied";
  await room.save();

  res.status(201).json(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("room");
  res.json(bookings);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("room");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  booking.status = "Cancelled";
  await booking.save();

  const room = await Room.findById(booking.room._id);
  if (room) {
    room.status = "Available";
    await room.save();
  }

  res.json({ message: "Booking cancelled", booking });
};