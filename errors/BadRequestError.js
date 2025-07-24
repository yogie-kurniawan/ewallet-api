import CustomError from "./CustomError.js";

class BadRequestError extends CustomError {
  constructor(message, status = 102, data = null) {
    super(400, status, message, data);
  }
}

export default BadRequestError;
