import * as bodyParser from "express";
import * as cors from "express";
import * as express from "express";
import * as logger from "morgan";
const app = express();
const port = 8080;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!!! hehe");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
