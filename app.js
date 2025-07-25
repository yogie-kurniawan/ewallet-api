import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./config/db.js";

// Import Routes
import routes from "./routes/index.js";

// import Middlewares
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

// Routes
app.use("/api", routes);
app.use("/uploads", express.static("public/uploads"));

// Middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

const startServer = async () => {
  try {
    console.log({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
    // app.listen(PORT, () => {
    //   database: process.env.DB_NAME,
    // });
    // const te = await pool.query("SELECT 1");
  } catch (error) {
    console.log("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
