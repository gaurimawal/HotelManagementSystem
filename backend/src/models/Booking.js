import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Check-in Pending", "Checked-in", "Checked-out"],
      default: "Confirmed"
    },
    totalAmount: { type: Number, required: true, min: 0 },
    invoiceNo: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);