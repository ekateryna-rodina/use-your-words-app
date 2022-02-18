"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = __importDefault(require("./config/db"));
var get_1 = require("./routes/vocabulary/get");
var get_2 = require("./routes/wordsApi/get");
var app = (0, express_1.default)();
var port = 8080;
app.use((0, morgan_1.default)("common", {
    stream: fs_1.default.createWriteStream("./access.log", { flags: "a" }),
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
db_1.default.authenticate()
    .then(function () { return console.log("Database is connected..."); })
    .catch(function (err) { return console.log(err); });
app.use(get_1.getWordsRouter);
app.use(get_2.getWordsApiRouter);
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map