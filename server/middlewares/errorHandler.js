// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the detailed error stack internally for debugging
  
    const statusCode = err.status || 500;  // Default to 500 if no status is set
    res.status(statusCode).json({
      message: err.message || "An internal server error occurred.",  // Send generic message to client
    });
  };
  
  module.exports = errorHandler;