import { Request, Response, NextFunction } from "express";
import { Boom } from "@hapi/boom";

export function errorHandler(
  err: TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") console.error(err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHandler(
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") console.error(err);
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else next(err);
}

//module.exports = { errorHandler, boomErrorHandler }
