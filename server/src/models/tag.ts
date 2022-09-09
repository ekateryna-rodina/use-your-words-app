"use strict";
import { Model } from "sequelize";

interface TagAttributes {
  id: string;
  name: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Tag extends Model<TagAttributes> implements TagAttributes {
    id!: string;
    name!: string;
    static associate(models: any) {
      Tag.belongsToMany(models.Quiz, {
        through: {
          model: "TagQuiz",
          unique: false,
        },
        hooks: true,
      });
    }
  }
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: { len: [3, 255] },
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
