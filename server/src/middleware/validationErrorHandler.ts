import { NextFunction, Request, Response } from "express";
import ValidationError from "../error/apiError";

function apiErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    return res.status(err.code).json(err.message);
  }
  return res.status(500).json("Server error");
}

export default apiErrorHandler;
