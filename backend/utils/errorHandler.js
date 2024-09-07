class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message); // Call the parent class constructor with the message
      this.statusCode = statusCode;
  
      // Capture the stack trace to help with debugging
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack; // Fallback for environments without captureStackTrace
      }
    }
  }
  
  export default ErrorHandler;
  