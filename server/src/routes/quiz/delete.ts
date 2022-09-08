import express, { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { deleteQuiz } from "../../services/quiz.service";
const router = express.Router();

router.delete(
  "/api/quiz",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    try {
      const result = await deleteQuiz(id as string);
      res.status(200).send(result);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as deleteQuizRouter };
