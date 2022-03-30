import express, { NextFunction, Request, Response } from "express";
import { generateQuestions } from "../../controllers/questions.controller";
import validate from "../../middleware/validate";
import validateWords from "../../schema/questions";
const router = express.Router();

router.get(
  "/api/questions",
  validate(validateWords),
  async (req: Request, res: Response, next: NextFunction) => {
    const questions = await generateQuestions(req.body.wordIds);
    res.status(200).json({ questions });
  }
);

export { router as postWordsRouter };
