import { NextFunction, Request, Response } from "express";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import ApiError from "../error/apiError";
export default function validate(schema: OptionalObjectSchema<ObjectShape>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("trrying to validate word");
    try {
      const validated = await schema.validate(req.body);
      req.body = validated;
      console.log(" validated word");
      next();
    } catch (err) {
      next(ApiError.BadRequest(err));
    }
  };
}
