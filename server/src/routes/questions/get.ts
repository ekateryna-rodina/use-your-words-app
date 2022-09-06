import express, { NextFunction, Request, Response } from "express";
import { QuestionType } from "use-your-words-common";
import { generateChallengesByWorddIds as generateChallenges } from "../../controllers/questions.controller";
import validate from "../../middleware/validate";
import { validateGetQuestionsInput } from "../../schema/questions";
import { generateQuestion as generateChallenge } from "../../services/questions.service";
const router = express.Router();

router.get(
  "/api/challenges",
  validate(validateGetQuestionsInput),
  async (req: Request, res: Response, next: NextFunction) => {
    const wordIds = (req.query.wordIds as string).split(",");
    const { challenges } = await generateChallenges(wordIds);
    res.status(200).json({ challenges });
  }
);

router.get(
  "/api/challenge",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wordId, quizWordIds, questionType, word } = req.query;
    const challenge = await generateChallenge(
      wordId as string,
      (quizWordIds as string).split(","),
      QuestionType[QuestionType[questionType as any]]
    );
    challenge.word = word as string;
    res.status(200).json(challenge);
  }
);

export { router as getQuestionsRouter };
