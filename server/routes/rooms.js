import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//create
router.post("/:hotelid",verifyAdmin, createRoom);

//update
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);

//get
router.get("/:id",getRoom);

//getAll
router.get("/",getRooms);
export default router;
