import express, { NextFunction, Request, Response } from "express";
import fetchWordInfo from "../../controllers/wordsApi.controller";
const router = express.Router();

router.get(
  "/api/wordsApi",
  async (req: Request, res: Response, next: NextFunction) => {
    const { word } = req.query;
    console.log("word is ", word);
    try {
      const wordInfo = await fetchWordInfo(word as string);
      res.status(200).send({ wordInfo });
    } catch (error) {
      res.send(500);
    }
  }
);

export { router as getWordsApiRouter };
