"use strict";
import { Model } from "sequelize";

interface QuizQuestionAttributes {
  QuizId: string;
  QuestionId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class QuizQuestion
    extends Model<QuizQuestionAttributes>
    implements QuizQuestionAttributes
  {
    QuizId!: string;
    QuestionId!: string;
  }
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
