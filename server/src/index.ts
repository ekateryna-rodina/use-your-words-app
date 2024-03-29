import cors from "cors";
import dotenv from "dotenv";
import { default as bodyParser, default as express } from "express";
import fs from "fs";
import logger from "morgan";
import apiErrorHandler from "./middleware/validationErrorHandler";
import db from "./models";
import { getPartOfSpeechRouter } from "./routes/partOfSpeech/get";
import { getQuestionsRouter } from "./routes/questions/get";
import { deleteQuizRouter } from "./routes/quiz/delete";
import { getQuizRouter } from "./routes/quiz/get";
import { postQuizRouter } from "./routes/quiz/post";
import { getTagsRouter } from "./routes/tag/get";
import { postTagsRouter } from "./routes/tag/post";
import { deleteWordsRouter } from "./routes/vocabulary/delete";
import { getWordsRouter } from "./routes/vocabulary/get";
import { postWordsRouter } from "./routes/vocabulary/post";
import { putWordsRouter } from "./routes/vocabulary/update";
import { getWordsApiRouter } from "./routes/wordsApi/get";
import { runSeed } from "./seeders/init";

const app = express();
app.set("etag", false);
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
dotenv.config();

app.use(getWordsRouter);
app.use(postWordsRouter);
app.use(putWordsRouter);
app.use(deleteWordsRouter);
app.use(deleteQuizRouter);
app.use(getWordsApiRouter);
app.use(getPartOfSpeechRouter);
app.use(getQuestionsRouter);
app.use(postQuizRouter);
app.use(getQuizRouter);
app.use(getTagsRouter);
app.use(postTagsRouter);

// middleware
app.use(apiErrorHandler);

// seed
runSeed();
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
});
