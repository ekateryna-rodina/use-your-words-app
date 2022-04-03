"use strict";
import { ENUM, Model } from "sequelize";
import { QuestionType } from "../types/Question";
interface QuestionAttributes {
  id: string;
  wordId: string;
  type: QuestionType;
  question: string;
  answer: string;
  options: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Question
    extends Model<QuestionAttributes>
    implements QuestionAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    wordId!: string;
    type!: QuestionType;
    question: string;
    answer: string;
    options: string;
    static associate(models: any) {
      Question.belongsToMany(models.Quiz, {
        through: "QuizQuestion",
      });
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: ENUM(
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
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
