import express, { NextFunction, Request, Response } from "express";
import { Quiz } from "use-your-words-common";
import { saveQuiz } from "../../controllers/quiz.controller";
import validate from "../../middleware/validate";
import { validateAddQuiz } from "../../schema/quiz";

const router = express.Router();

router.post(
  "/api/quiz",
  validate(validateAddQuiz),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as Quiz;
      const quiz = await saveQuiz(data);
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export { router as postQuizRouter };
