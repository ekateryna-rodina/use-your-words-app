import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

router.get(
  "/api/words",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send({ words: [] });
    } catch (error) {
      next(error);
    }
  }
);

export { router as getWordsRouter };
