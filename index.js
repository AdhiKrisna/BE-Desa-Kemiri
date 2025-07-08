import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pendudukRoutes from "./routes/pendudukRoute.js";
import strukturalRoutes from "./routes/strukturalRoute.js";
import association from "./config/assoc.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/penduduk", pendudukRoutes);
app.use("/api/struktural", strukturalRoutes);

app.get("/", (req, res) => {
  res.send("Backend Desa Kemiri");
});

const startServer = async () => {
  try {
    await association();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
