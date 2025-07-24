import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

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
    // const URI = process.env.MONGO_URI;
    // await connectDB(URI);
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup error:", error.message);
  }
};

startServer();
