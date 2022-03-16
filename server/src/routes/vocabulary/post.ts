import express, { NextFunction, Request, Response } from "express";
import { saveWord } from "../../controllers/words.controller";
import validate from "../../middleware/validate";
import validateWord from "../../schema/word";
const router = express.Router();

router.post(
  "/api/words",
  validate(validateWord),
  async (req: Request, res: Response, next: NextFunction) => {
    const wordInfo = await saveWord(req.body);
    if (!wordInfo) {
      res.status(500).json({ error: "Cannot save the word" });
    } else {
      res.status(200).json({ wordInfo });
    }
  }
);

export { router as postWordsRouter };
