"use strict";
import { Model } from "sequelize";

interface WordAttributes {
  id: string;
  word: string;
  fileUrl: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Word extends Model<WordAttributes> implements WordAttributes {
    id!: string;
    word!: string;
    fileUrl!: string;
    static associate(models: any) {
      Word.belongsToMany(models.PartOfSpeech, {
        through: "WordPartOfSpeech",
      });
      Word.hasMany(models.Meaning, {
        foreignKey: "wordId",
      });
      Word.hasMany(models.Phrase, {
        foreignKey: "wordId",
      });
      Word.hasMany(models.Synonym, {
        foreignKey: "wordId",
      });
      Word.hasMany(models.Antonym, {
        foreignKey: "wordId",
      });
    }
  }
  Word.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};
