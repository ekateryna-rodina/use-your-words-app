import * as cors from "cors";
import * as bodyParser from "express";
import * as express from "express";
import * as fs from "fs";
import * as logger from "morgan";
import { Sequelize } from "sequelize";
import { getWordsRouter } from "./routes/vocabulary/get";

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

const sequelize = new Sequelize("uyw-db", "katerynarodina", "kariedb", {
  host: "localhost",
  dialect: "postgres",
});

// db health check
sequelize
  .authenticate()
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

app.use(getWordsRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
