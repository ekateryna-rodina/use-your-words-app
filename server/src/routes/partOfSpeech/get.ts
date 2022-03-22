import express, { NextFunction, Request, Response } from "express";
import { fetchPartsOfSpeech } from "../../controllers/words.controller";
import ApiError from "../../error/apiError";
const router = express.Router();

router.get(
  "/api/partOfSpeech",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fetchPartsOfSpeech();
      res.status(200).send(result);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as getPartOfSpeechRouter };
