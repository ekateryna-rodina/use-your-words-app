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
  }
  WordPartOfSpeech.init(
    {
      PartOfSpeechId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "PartOfSpeech",
          key: "id",
        },
      },
      WordId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Word",
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
