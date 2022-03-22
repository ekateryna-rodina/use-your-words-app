import express, { NextFunction, Request, Response } from "express";
import ApiError from "../../error/apiError";
import validate from "../../middleware/validate";
import validateWord from "../../schema/word";
const router = express.Router();

router.put(
  "/api/words",
  validate(validateWord),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const wordInfo = await updateWord(req.body);
      // res.status(200).json({ wordInfo });
      console.log(req);
      res.status(200);
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as putWordsRouter };
