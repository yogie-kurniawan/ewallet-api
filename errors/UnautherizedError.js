import CustomError from "./CustomError.js";

class UnautherizedError extends CustomError {
  constructor(message, status = 108, data = null) {
    super(401, status, message, data);
  }
}

export default UnautherizedError;
