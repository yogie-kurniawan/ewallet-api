import CustomError from "./CustomError.js";

class ForbiddenError extends CustomError {
  constructor(message, status = 102, data = null) {
    super(403, status, message, data);
  }
}

export default ForbiddenError;
