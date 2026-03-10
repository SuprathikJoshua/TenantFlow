import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Import the routes
import authRoutes from "./routes/auth.routes";
import organizationRoutes from "./routes/organization.routes";
import invitationRoutes from "./routes/invitation.routes";
// Use the routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizations", organizationRoutes);
app.use("/api/v1/invitations", invitationRoutes);

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
