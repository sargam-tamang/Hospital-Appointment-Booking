import express from "express";
import indexRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;