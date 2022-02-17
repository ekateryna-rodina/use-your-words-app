"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var bodyParser = require("express");
var express = require("express");
var fs = require("fs");
var logger = require("morgan");
var sequelize_1 = require("sequelize");
var get_1 = require("./routes/vocabulary/get");
var app = express();
var port = 8080;
app.use(logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
}));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
var sequelize = new sequelize_1.Sequelize("uyw-db", "katerynarodina", "kariedb", {
    host: "localhost",
    dialect: "postgres",
});
sequelize
    .authenticate()
    .then(function () { return console.log("Database is connected..."); })
    .catch(function (err) { return console.log(err); });
app.use(get_1.getWordsRouter);
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map