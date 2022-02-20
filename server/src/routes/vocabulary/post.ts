import express, { NextFunction, Request, Response } from "express";
import { saveWord } from "../../controllers/words.controller";
import ApiError from "../../error/validationError";
import validate from "../../middleware/validate";
import validateWord from "../../schema/word";
const router = express.Router();

router.post(
  "/api/words",
  validate(validateWord),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wordInfo = await saveWord(req.body);
      res.status(200).json({ wordInfo });
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as postWordsRouter };
