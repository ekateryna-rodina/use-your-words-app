import express, { NextFunction, Request, Response } from "express";
import { updateWord } from "../../controllers/words.controller";
import validate from "../../middleware/validate";
import { validateEditWord } from "../../schema/word";
const router = express.Router();

router.put(
  "/api/words/:wordId",
  validate(validateEditWord),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wordInfo = await updateWord(req.body);
      res.status(200).json({ wordInfo });
    } catch (error) {
      console.log(error);
      // next(new ApiError(error.code, error.message));
    }
  }
);

export { router as putWordsRouter };
