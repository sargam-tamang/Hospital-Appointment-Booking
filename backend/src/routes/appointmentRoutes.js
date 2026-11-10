import express from "express";
import appointmentController from "../controllers/appointmentController.js";

const router = express.Router();


router.get("/:user_id", appointmentController.getAppointments);
router.post("/:user_id", appointmentController.createAppointment);
router.patch("/:id", appointmentController.cancelAppointment);

export default router;