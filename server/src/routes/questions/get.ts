import express, { NextFunction, Request, Response } from "express";
import { QuestionType } from "use-your-words-common";
import { generateChallengesByWorddIds as generateChallenges } from "../../controllers/questions.controller";
import validate from "../../middleware/validate";
import { validateGetQuestionsInput } from "../../schema/questions";
import { generateQuestion } from "../../services/questions.service";
const router = express.Router();

router.get(
  "/api/challenges",
  validate(validateGetQuestionsInput),
  async (req: Request, res: Response, next: NextFunction) => {
    const wordIds = (req.query.wordIds as string).split(",");
    const { challenges } = await generateChallenges(wordIds);
    console.log(challenges);
    res.status(200).json({ challenges });
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
