"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("express");
var cors = require("express");
var express = require("express");
var logger = require("morgan");
var app = express();
var port = 8080;
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.get("/", function (req, res) {
    res.send("Hello world!!! hehe");
});
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map