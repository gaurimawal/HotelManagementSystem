import express from "express";
import { getRooms, getRoomById } from "../controllers/roomController.js";

const router = express.Router();

// Public routes — no auth needed to browse rooms
router.get("/", getRooms);
router.get("/:id", getRoomById);

export default router;