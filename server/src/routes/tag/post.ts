import express, { NextFunction, Request, Response } from "express";
import { saveTags } from "../../controllers/tags.controller";
import validate from "../../middleware/validate";
import { validateAddTags } from "../../schema/tags";
const router = express.Router();

router.post(
  "/api/tags",
  validate(validateAddTags),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagsInfo = await saveTags(req.body);
      res.status(200).json({ tagsInfo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export { router as postTagsRouter };
