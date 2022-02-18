import cors from "cors";
import { default as bodyParser, default as express } from "express";
import fs from "fs";
import logger from "morgan";
import db from "./config/db";
import { getWordsRouter } from "./routes/vocabulary/get";
import { getWordsApiRouter } from "./routes/wordsApi/get";

const app = express();
const port = 8080;

app.use(
  logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

// db health check
db.authenticate()
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

app.use(getWordsRouter);
app.use(getWordsApiRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
