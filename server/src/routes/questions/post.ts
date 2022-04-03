import express, { NextFunction, Request, Response } from "express";
import { saveQuizQuestions } from "../../controllers/questions.controller";
import { Quiz } from "../../types/Question";
const router = express.Router();

router.post(
  "/api/questions",
  //   validate(validateSaveQuestionsInput),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const data = req.body as Quiz;
    const quiz = await saveQuizQuestions(data);
    res.status(200).json({ quiz });
  }
);

export { router as postQuestionsRouter };
