"use strict";
import { Model } from "sequelize";

interface QuestionAttributes {
  id: string;
  wordId: string;
  question: string;
  answer: string;
  options: string;
  type: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Question
    extends Model<QuestionAttributes>
    implements QuestionAttributes
  {
    id!: string;
    wordId!: string;
    question: string;
    answer: string;
    options: string;
    type!: string;

    static associate(models: any) {
      Question.belongsToMany(models.Quiz, {
        through: {
          model: "QuizQuestion",
        },
        constraints: false,
        onDelete: "CASCADE",
        hooks: true,
      });
      Question.belongsTo(models.Word, {
        foreignKey: "wordId",
        onDelete: "CASCADE",
      });
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      wordId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Words",
          key: "id",
        },
      },
      question: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      answer: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      options: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM(
          "FillGap",
          "Pronounce",
          "TypeWordByPronunciation",
          "TypeWordByMeaning",
          "ChooseMeaningByWord",
          "ChooseWordByMeaning",
          "ConnectWordsWithMeanings",
          "ChooseSynonymByWord",
          "ChooseAntonymByWord",
          "ChooseWordBySynonym",
          "ChooseWordByAntonym"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
