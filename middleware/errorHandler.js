import { CustomError } from "../errors/index.js";

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log(err.message);
    return res.status(err.statusCode).json({
      status: err.status || 102,
      message: err.message,
      data: err.data || null,
    });
  }

  // Fallback untuk error biasa
  return res.status(500).json({
    status: 102,
    message: err.message || "Terjadi kesalahan sistem",
    data: null,
  });
};

export default errorHandler;
