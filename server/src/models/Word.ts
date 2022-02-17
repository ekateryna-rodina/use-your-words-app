import * as Sequelize from "sequelize";
import db from "../config/db";
import Antonym from "./Antonym";
import PartOfSpeech from "./PartOfSpeech";
import Phrase from "./Phrase";
import Synonym from "./Synonym";

const Word = db.define(
  "words",
  {
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
  },
  { schema: "vocabulary", timestamps: false }
);

Word.hasMany(Phrase, { as: "phrases" });
Phrase.belongsTo(Word, {
  foreignKey: "word_id",
  as: "word",
});

Word.hasMany(Synonym, { as: "synonyms" });
Synonym.belongsTo(Word, {
  foreignKey: "word_id",
  as: "word",
});

Word.hasMany(Antonym, { as: "antonyms" });
Antonym.belongsTo(Word, {
  foreignKey: "word_id",
  as: "word",
});

Word.hasOne(PartOfSpeech, { as: "part_of_speech", foreignKey: "id" });

export default Word;
