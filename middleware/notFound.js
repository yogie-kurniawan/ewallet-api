import { NotFoundError } from "../errors/index.js";

const notFound = (req, res, next) => {
  res.status(404).json({
    status: 102,
    message: "Route tidak ditemukan",
  });
};

export default notFound;
