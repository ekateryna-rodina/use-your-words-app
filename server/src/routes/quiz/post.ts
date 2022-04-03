import express, { NextFunction, Request, Response } from "express";
import { saveQuizQuestions } from "../../controllers/quiz.controller";
import { Quiz } from "../../types/Question";
const router = express.Router();

router.post(
  "/api/quiz",
  //   validate(validateSaveQuestionsInput),
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as Quiz;
    const quiz = await saveQuizQuestions(data);
    res.status(200).json(quiz);
  }
);

export { router as postQuizRouter };
