import cors from "cors";
import dotenv from "dotenv";
import { default as bodyParser, default as express } from "express";
import fs from "fs";
import logger from "morgan";
import apiErrorHandler from "./middleware/validationErrorHandler";
import db from "./models";
import { getWordsRouter } from "./routes/vocabulary/get";
import { postWordsRouter } from "./routes/vocabulary/post";
import { putWordsRouter } from "./routes/vocabulary/update";
import { getWordsApiRouter } from "./routes/wordsApi/get";
import { runSeed } from "./seeders/init";

const app = express();

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
app.use(getWordsApiRouter);

// middleware
app.use(apiErrorHandler);

// seed
runSeed();
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
});
