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
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sukses!",
  });
});
app.use("/api", routes);
app.use("/uploads", express.static("public/uploads"));

// Middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

const startServer = async () => {
  try {
    const te = await pool.query("SELECT 1");
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
