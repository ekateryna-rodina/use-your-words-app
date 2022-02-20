"use strict";
import { Model } from "sequelize";
interface SynonymAttributes {
  id: string;
  synonym: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Synonym extends Model<SynonymAttributes> implements SynonymAttributes {
    id!: string;
    synonym!: string;
    static associate(models: any) {
      Synonym.belongsTo(models.Word, {
        foreignKey: "wordId",
        onDelete: "CASCADE",
      });
    }
  }
  Synonym.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      synonym: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Synonym",
    }
  );
  return Synonym;
};
