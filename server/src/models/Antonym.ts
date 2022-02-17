import * as Sequelize from "sequelize";
import db from "../config/db";

const Antonym = db.define(
  "antonyms",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    antonym: {
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

export default Antonym;
