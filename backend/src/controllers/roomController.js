
import Room from "../models/Room.js";

export const getRooms = async (req, res) => {
  const { type, maxPrice, status } = req.query;
  const query = {};
  if (type) query.type = type;
  if (status) query.status = status;
  if (maxPrice) query.price = { $lte: Number(maxPrice) };

  const rooms = await Room.find(query).sort({ createdAt: -1 });
  res.json(rooms);
};

export const getRoomById = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};