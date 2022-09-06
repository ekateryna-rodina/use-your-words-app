"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuizQuestion extends sequelize_1.Model {}
  QuizQuestion.init(
    {
      QuizId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Quiz",
          key: "id",
        },
      },
      QuestionId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Question",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "QuizQuestion",
    }
  );
  return QuizQuestion;
};
//# sourceMappingURL=quizquestion.js.map
