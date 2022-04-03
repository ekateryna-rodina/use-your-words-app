import express, { NextFunction, Request, Response } from "express";
import { generateQuestions } from "../../controllers/questions.controller";
import validate from "../../middleware/validate";
import { validateGetQuestionsInput } from "../../schema/questions";
import { generateQuestion } from "../../services/questions.service";
import { QuestionType } from "../../types/Question";
const router = express.Router();

router.get(
  "/api/questions",
  validate(validateGetQuestionsInput),
  async (req: Request, res: Response, next: NextFunction) => {
    const wordIds = (req.query.wordIds as string).split(",");
    const quiz = await generateQuestions(wordIds);
    res.status(200).json({ quiz });
  }
);

router.get(
  "/api/question/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wordId, quizWordIds, questionType } = req.query;
    const question = await generateQuestion(
      wordId as string,
      (quizWordIds as string).split(","),
      QuestionType[questionType as keyof typeof QuestionType]
    );
    res.status(200).json({ question });
  }
);

export { router as getQuestionsRouter };
