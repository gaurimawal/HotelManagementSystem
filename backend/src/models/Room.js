import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNo: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available"
    },
    amenities: [{ type: String }],
    images: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);