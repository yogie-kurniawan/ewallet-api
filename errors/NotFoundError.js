import CustomError from "./CustomError.js";

class NotFoundError extends CustomError {
  constructor(message, status = 102, data = null) {
    super(404, status, message, data);
  }
}
export default NotFoundError;
