"use strict";
import { Model } from "sequelize";
interface WordPartOfSpeechAttributes {
  PartOfSpeechId: string;
  WordId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class WordPartOfSpeech
    extends Model<WordPartOfSpeechAttributes>
    implements WordPartOfSpeechAttributes
  {
    PartOfSpeechId!: string;
    WordId!: string;
    static associate(models: any) {
      console.log(models);
    }
  }
  WordPartOfSpeech.init(
    {
      PartOfSpeechId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "PartOfSpeeches",
          key: "id",
        },
      },
      WordId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Words",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "WordPartOfSpeech",
    }
  );
  return WordPartOfSpeech;
};
