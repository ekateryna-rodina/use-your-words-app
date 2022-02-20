"use strict";
import { Model } from "sequelize";
interface AntonymAttributes {
  id: string;
  antonym: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Antonym extends Model<AntonymAttributes> implements AntonymAttributes {
    id!: string;
    antonym!: string;
    static associate(models: any) {
      Antonym.belongsTo(models.Word, {
        foreignKey: "wordId",
        onDelete: "CASCADE",
      });
    }
  }
  Antonym.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      antonym: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Antonym",
    }
  );
  return Antonym;
};
