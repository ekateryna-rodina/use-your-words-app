import express, { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import { deleteQuiz } from "../../services/quiz.service";
const router = express.Router();

router.delete(
  "/api/quiz/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log("delete quiz", id);
    try {
      const result = await deleteQuiz(id);
      res.status(200).send(result);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as deleteWordsRouter };
