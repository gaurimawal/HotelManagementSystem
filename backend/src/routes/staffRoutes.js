import express from "express";
import {
  getServiceRequests,
  getStaffBookings,
  updateBookingStatus,
  updateRoomStatus
} from "../controllers/staffController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(protect, allowRoles("staff", "admin"));

router.get("/bookings", getStaffBookings);
router.patch("/bookings/:id/status", updateBookingStatus);
router.patch("/rooms/:id/status", updateRoomStatus);
router.get("/requests", getServiceRequests);

export default router;