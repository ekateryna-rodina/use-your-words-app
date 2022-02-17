import express, { NextFunction, Request, Response } from "express";
import Antonym from "../../models/Antonym";
import PartOfSpeech from "../../models/PartOfSpeech";
import Phrase from "../../models/Phrase";
import Synonym from "../../models/Synonym";
import Word from "../../models/Word";
const router = express.Router();

router.get(
  "/api/words",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const words = await Word.findAll({
        include: [
          {
            model: Phrase,
            as: "phrases",
          },
          {
            model: PartOfSpeech,
            as: "part_of_speech",
          },
          {
            model: Synonym,
            as: "synonyms",
          },
          {
            model: Antonym,
            as: "antonyms",
          },
        ],
      });
      res.status(200).send({ words });
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

export { router as getWordsRouter };
