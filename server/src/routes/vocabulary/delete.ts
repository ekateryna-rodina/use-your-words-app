import express, { NextFunction, Request, Response } from "express";
import { dropWord } from "../../controllers/words.controller";
import ApiError from "../../error/apiError";
const router = express.Router();

router.delete(
  "/api/words",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    try {
      const result = await dropWord(id.toString());
      res.status(200).send(result);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as deleteWordsRouter };
