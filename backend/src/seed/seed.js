import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import ServiceRequest from "../models/ServiceRequest.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongo connected for seeding");
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await ServiceRequest.deleteMany({});
    await Booking.deleteMany({});
    await Room.deleteMany({});
    await User.deleteMany({});

    // Users (password is plain; model pre-save hook hashes it)
    const users = await User.create([
      {
        name: "Carol Admin",
        email: "admin@hms.com",
        password: "123456",
        role: "admin",
        phone: "555-1002"
      },
      {
        name: "Bob Staff",
        email: "staff@hms.com",
        password: "123456",
        role: "staff",
        phone: "555-1001"
      },
      {
        name: "Alice Customer",
        email: "customer@hms.com",
        password: "123456",
        role: "customer",
        phone: "555-1000"
      }
    ]);

    const admin = users.find((u) => u.role === "admin");
    const staff = users.find((u) => u.role === "staff");
    const customer = users.find((u) => u.role === "customer");

    // Rooms
    const rooms = await Room.create([
      {
        roomNo: "A-101",
        type: "Deluxe",
        price: 180,
        status: "Available",
        amenities: ["WiFi", "TV", "Mini Bar"],
        images: ["https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800"]
      },
      {
        roomNo: "A-102",
        type: "Suite",
        price: 280,
        status: "Occupied",
        amenities: ["WiFi", "Jacuzzi", "Sea View"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"]
      },
      {
        roomNo: "B-201",
        type: "Standard",
        price: 120,
        status: "Maintenance",
        amenities: ["WiFi", "Work Desk"],
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"]
      },
      {
        roomNo: "C-301",
        type: "Deluxe",
        price: 200,
        status: "Available",
        amenities: ["WiFi", "Balcony"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800"]
      }
    ]);

    // Bookings
    const bookings = await Booking.create([
      {
        user: customer._id,
        room: rooms[1]._id, // Occupied room
        checkIn: new Date("2026-04-20"),
        checkOut: new Date("2026-04-24"),
        status: "Checked-in",
        totalAmount: 280 * 4,
        invoiceNo: `INV-${Date.now()}-01`
      },
      {
        user: customer._id,
        room: rooms[0]._id,
        checkIn: new Date("2026-05-03"),
        checkOut: new Date("2026-05-06"),
        status: "Confirmed",
        totalAmount: 180 * 3,
        invoiceNo: `INV-${Date.now()}-02`
      }
    ]);

    // Service Requests
    await ServiceRequest.create([
      {
        room: rooms[1]._id,
        booking: bookings[0]._id,
        request: "Extra towels",
        priority: "Normal",
        status: "Open",
        assignedStaff: staff._id
      },
      {
        room: rooms[1]._id,
        booking: bookings[0]._id,
        request: "AC issue",
        priority: "High",
        status: "In Progress",
        assignedStaff: staff._id
      }
    ]);

    console.log("Seed completed successfully");
    console.log({
      admin: admin.email,
      staff: staff.email,
      customer: customer.email,
      passwordForAll: "123456"
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();