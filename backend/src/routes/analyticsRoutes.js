import express from "express";
import { getRevenueAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/revenue", protect, allowRoles("admin"), getRevenueAnalytics);

export default router;