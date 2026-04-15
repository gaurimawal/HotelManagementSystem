import express from "express";
import { cancelBooking, createBooking, getMyBookings } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, allowRoles("customer"), createBooking);
router.get("/my", protect, allowRoles("customer"), getMyBookings);
router.patch("/:id/cancel", protect, allowRoles("customer"), cancelBooking);

export default router;