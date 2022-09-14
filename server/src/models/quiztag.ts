"use strict";
import { Model } from "sequelize";

interface QuizTagAttributes {
  QuizId: number;
  TagId: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class QuizTag extends Model<QuizTagAttributes> implements QuizTagAttributes {
    QuizId!: number;
    TagId!: number;
    static associate(models: any) {
      /* tslint:disable:no-empty */
    }
  }
  QuizTag.init(
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
      TagId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Tag",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TagQuiz",
    }
  );
  return QuizTag;
};
