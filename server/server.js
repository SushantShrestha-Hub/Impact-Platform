import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) =>
  res.json({
    status: "ok",
    message: "ImpactOS API is running",
    database: "MongoDB Atlas",
    timestamp: new Date(),
  }),
);

// 404 handler — for any route that doesn't exist
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler — catches all unhandled errors
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log("================================");
  console.log(`  ImpactOS API`);
  console.log(`  Port     : ${PORT}`);
  console.log(`  Mode     : ${process.env.NODE_ENV}`);
  console.log("================================");
});

export default app;
