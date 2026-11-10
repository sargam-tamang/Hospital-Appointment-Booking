import express from "express";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./userRoutes.js";
import docRoutes from "./docRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import prescriptionRoutes from  "./prescriptionRoutes.js";


const router = express.Router();

router.use("/users", userRoutes);
router.use("/doctors", docRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/prescriptions", prescriptionRoutes);


const openapiFile = fs.readFileSync(
    'src/docs/openapi.yaml',
    'utf8'
  );
  
  const swaggerDocument = YAML.parse(openapiFile);
  
  // Swagger UI
  router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

export default router;