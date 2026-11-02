import express from "express";
import userRoutes from "./userRoutes.js";
import docRoutes from "./docRoutes.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/doc", docRoutes);
export default router;