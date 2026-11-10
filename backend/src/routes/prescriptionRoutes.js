import express from "express";
import prescriptionController from "../controllers/prescriptionController.js";

const router = express.Router();


router.get("/:user_id", prescriptionController.getPrescriptions);
router.post("/:user_id", prescriptionController.createPrescription);

export default router;