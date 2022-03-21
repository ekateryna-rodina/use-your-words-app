import express, { NextFunction, Request, Response } from "express";
import { getAllWords } from "../../controllers/words.controller";
import ApiError from "../../error/apiError";
const router = express.Router();

router.get(
  "/api/words",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const words = await getAllWords();
      res.status(200).send({ words });
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as getWordsRouter };
