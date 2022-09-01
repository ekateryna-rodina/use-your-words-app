import express, { NextFunction, Request, Response } from "express";
import { dropWord } from "../../controllers/words.controller";
import ApiError from "../../error/apiError";
const router = express.Router();

router.delete(
  "/api/words/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await dropWord(id);
      res.status(200).send(result);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as deleteWordsRouter };
