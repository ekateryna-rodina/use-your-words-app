"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const validationErrorHandler_1 = __importDefault(require("./middleware/validationErrorHandler"));
const models_1 = __importDefault(require("./models"));
const get_1 = require("./routes/partOfSpeech/get");
const get_2 = require("./routes/questions/get");
const delete_1 = require("./routes/vocabulary/delete");
const get_3 = require("./routes/vocabulary/get");
const post_1 = require("./routes/vocabulary/post");
const update_1 = require("./routes/vocabulary/update");
const get_4 = require("./routes/wordsApi/get");
const init_1 = require("./seeders/init");
const app = (0, express_1.default)();
app.set("etag", false);
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("common", {
    stream: fs_1.default.createWriteStream("./access.log", { flags: "a" }),
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
dotenv_1.default.config();
app.use(get_3.getWordsRouter);
app.use(post_1.postWordsRouter);
app.use(update_1.putWordsRouter);
app.use(delete_1.deleteWordsRouter);
app.use(get_4.getWordsApiRouter);
app.use(get_1.getPartOfSpeechRouter);
app.use(get_2.getQuestionsRouter);
app.use(validationErrorHandler_1.default);
(0, init_1.runSeed)();
models_1.default.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map