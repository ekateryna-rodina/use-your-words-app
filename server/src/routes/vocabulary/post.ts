import express, { NextFunction, Request, Response } from "express";
import ApiError from "../../error/validationError";
import validate from "../../middleware/validate";
import validateWord from "../../schema/word";
const router = express.Router();

router.post(
  "/api/words",
  validate(validateWord),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("here");
      console.log(req.body);
      res.status(200);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as postWordsRouter };
