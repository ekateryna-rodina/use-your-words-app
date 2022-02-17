"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = __importStar(require("sequelize"));
var db_1 = __importDefault(require("../config/db"));
var Antonym_1 = __importDefault(require("./Antonym"));
var PartOfSpeech_1 = __importDefault(require("./PartOfSpeech"));
var Phrase_1 = __importDefault(require("./Phrase"));
var Synonym_1 = __importDefault(require("./Synonym"));
var Word = db_1.default.define("words", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    word: {
        type: Sequelize.STRING,
        unique: true,
    },
    meaning: {
        type: Sequelize.STRING,
    },
    fileUrl: {
        type: Sequelize.STRING,
        field: "file_url",
    },
    partId: {
        type: Sequelize.UUID,
        references: {
            model: {
                tableName: "parts_of_speech",
            },
            key: "id",
        },
        field: "part_id",
    },
}, { schema: "vocabulary", timestamps: false });
Word.hasMany(Phrase_1.default, { as: "phrases" });
Phrase_1.default.belongsTo(Word, {
    foreignKey: "word_id",
    as: "word",
});
Word.hasMany(Synonym_1.default, { as: "synonyms" });
Synonym_1.default.belongsTo(Word, {
    foreignKey: "word_id",
    as: "word",
});
Word.hasMany(Antonym_1.default, { as: "antonyms" });
Antonym_1.default.belongsTo(Word, {
    foreignKey: "word_id",
    as: "word",
});
Word.hasOne(PartOfSpeech_1.default, { as: "part_of_speech", foreignKey: "id" });
exports.default = Word;
//# sourceMappingURL=Word.js.map