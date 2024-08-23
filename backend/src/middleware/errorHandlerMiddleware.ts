import { NextFunction, Request, Response } from "express";
import ExpressError from "utils/ExpressError";

const errorHandlerMiddleware = (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message = "Something went wrong..." } = err;
    console.log(`Error message: ${err.message}`);

  // Log the error stack only in development mode
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Handle custom ExpressError
  if (err instanceof ExpressError) {
    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }

  // Default to general error response
  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
  });
};

export default errorHandlerMiddleware;