class CustomError extends Error {
  constructor(statusCode, status, message, data) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default CustomError;
