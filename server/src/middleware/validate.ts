import { NextFunction, Request, Response } from "express";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import ApiError from "../error/apiError";
export default function validate(schema: OptionalObjectSchema<ObjectShape>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body);
      req.body = validated;
      next();
    } catch (err) {
      next(ApiError.BadRequest(err));
    }
  };
}
