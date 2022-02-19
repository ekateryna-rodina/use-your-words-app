import cors from "cors";
import dotenv from "dotenv";
import { default as bodyParser, default as express } from "express";
import fs from "fs";
import logger from "morgan";
import db from "./config/db";
import apiErrorHandler from "./middleware/validationErrorHandler";
import { getWordsRouter } from "./routes/vocabulary/get";
import { postWordsRouter } from "./routes/vocabulary/post";
import { getWordsApiRouter } from "./routes/wordsApi/get";

const app = express();
const port = 8080;
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
dotenv.config();
app.use(bodyParser.json());

// db health check
db.authenticate()
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

app.use(getWordsRouter);
app.use(postWordsRouter);
app.use(getWordsApiRouter);

// middleware
app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
