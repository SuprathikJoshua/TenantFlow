import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Basic Configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json());
app.use(cookieParser());

// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// Sample route
app.get("/", (req, res) => {
  res.send("TenantFlow Backend is running!");
});

export default app;
