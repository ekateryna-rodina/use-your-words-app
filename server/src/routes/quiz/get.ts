import express, { NextFunction, Request, Response } from "express";
import { getQuizQuestions } from "../../controllers/quiz.controller";
const router = express.Router();

router.get(
  "/api/quiz",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const quizzes = await getQuizQuestions();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export { router as getQuizRouter };
