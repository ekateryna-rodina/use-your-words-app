import * as Sequelize from "sequelize";
import db from "../config/db";

const Synonym = db.define(
  "synonyms",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    synonym: {
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

export default Synonym;
