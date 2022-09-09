import express, { NextFunction, Request, Response } from "express";
import { getAllTags } from "../../controllers/tags.controller";
import ApiError from "../../error/apiError";
const router = express.Router();

router.get(
  "/api/tags",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await getAllTags();
      res.status(200).send({ tags });
    } catch (error) {
      next(new ApiError(error.code, error.message));
    }
  }
);

export { router as getTagsRouter };
