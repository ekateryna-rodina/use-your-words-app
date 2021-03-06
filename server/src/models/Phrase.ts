"use strict";
import { Model } from "sequelize";
interface PhraseAttributes {
  id: string;
  phrase: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Phrase extends Model<PhraseAttributes> implements PhraseAttributes {
    id!: string;
    phrase!: string;
    static associate(models: any) {
      Phrase.belongsTo(models.Word, {
        foreignKey: "wordId",
        onDelete: "CASCADE",
      });
    }
  }
  Phrase.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      phrase: {
        type: DataTypes.STRING,
        validate: { len: [5, 255] },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Phrase",
    }
  );
  return Phrase;
};
