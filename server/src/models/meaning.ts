"use strict";
import { Model } from "sequelize";
interface MeaningAttributes {
  id: string;
  meaning: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Meaning extends Model<MeaningAttributes> implements MeaningAttributes {
    id!: string;
    meaning!: string;
    static associate(models: any) {
      Meaning.belongsTo(models.Word, {
        foreignKey: "wordId",
        onDelete: "CASCADE",
      });
    }
  }
  Meaning.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      meaning: {
        type: DataTypes.STRING,
        validate: { len: [5, 255] },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Meaning",
    }
  );
  return Meaning;
};
