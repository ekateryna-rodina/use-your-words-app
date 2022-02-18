import express, { NextFunction, Request, Response } from "express";
import { fetchWordDictionary } from "../../services/wordsApi.service";
const router = express.Router();

router.get(
  "/api/wordsApi",
  async (req: Request, res: Response, next: NextFunction) => {
    const { word } = req.query as { word: string };
    try {
      const data = await fetchWordDictionary(word);
      res.status(200).send({ wordInfo: data[0] });
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  }
);

export { router as getWordsApiRouter };
