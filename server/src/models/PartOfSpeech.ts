"use strict";
import { Model } from "sequelize";
interface PartOfSpeechAttributes {
  id: string;
  part: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class PartOfSpeech
    extends Model<PartOfSpeechAttributes>
    implements PartOfSpeechAttributes
  {
    id!: string;
    part!: string;
    static associate(models: any) {
      PartOfSpeech.belongsToMany(models.Word, {
        through: "WordPartOfSpeech",
      });
    }
  }
  PartOfSpeech.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      part: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "PartOfSpeech",
    }
  );
  return PartOfSpeech;
};
