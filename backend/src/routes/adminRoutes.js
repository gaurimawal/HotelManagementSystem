import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllBookings,
  getKpis,
  getUsers,
  updateRoom,
  updateUserRole
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(protect, allowRoles("admin"));

router.get("/kpis", getKpis);

router.post("/rooms", createRoom);
router.put("/rooms/:id", updateRoom);
router.delete("/rooms/:id", deleteRoom);

router.get("/users", getUsers);
router.patch("/users/:id/role", updateUserRole);

router.get("/bookings", getAllBookings);

export default router;