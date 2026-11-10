import express from "express";
import docController from "../controllers/docController.js";

const router = express.Router();


router.get("/", docController.getDoctors);
router.post("/", docController.createDoctor);
router.get("/:id", docController.getDocById);

export default router;