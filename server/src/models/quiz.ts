"use strict";
import { Model } from "sequelize";

interface QuizAttributes {
  id: string;
  name: string;
  isFreeze: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Quiz extends Model<QuizAttributes> implements QuizAttributes {
    id!: string;
    name!: string;
    isFreeze!: boolean;
    static associate(models: any) {
      Quiz.belongsToMany(models.Question, {
        through: {
          model: "QuizQuestion",
          unique: false,
        },
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Quiz.init(
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
      isFreeze: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Quiz",
    }
  );
  return Quiz;
};