import * as Sequelize from "sequelize";
import db from "../config/db";

const PartOfSpeech = db.define(
  "parts_of_speech",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    part: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { schema: "vocabulary", timestamps: false, freezeTableName: true }
);

export default PartOfSpeech;
