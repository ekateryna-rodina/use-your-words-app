import * as Sequelize from "sequelize";
import db from "../config/db";

const Phrase = db.define(
  "phrases",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phrase: {
      type: Sequelize.STRING,
      unique: true,
    },
    wordId: {
      type: Sequelize.INTEGER,
      field: "word_id",
    },
  },
  { schema: "vocabulary", timestamps: false }
);

export default Phrase;
