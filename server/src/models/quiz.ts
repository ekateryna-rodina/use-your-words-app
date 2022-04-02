"use strict";
import { Model } from "sequelize";

interface QuizAttributes {
  id: string;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Quiz extends Model<QuizAttributes> implements QuizAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    static associate(models: any) {
      Quiz.belongsToMany(models.Question, {
        through: "QuizQuestion",
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
    },
    {
      sequelize,
      modelName: "Quiz",
    }
  );
  return Quiz;
};
