import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    request: { type: String, required: true },
    priority: { type: String, enum: ["Low", "Normal", "High"], default: "Normal" },
    status: { type: String, enum: ["Open", "In Progress", "Resolved"], default: "Open" },
    assignedStaff: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);