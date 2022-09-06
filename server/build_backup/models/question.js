"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Question extends sequelize_1.Model {
        static associate(models) {
            Question.belongsToMany(models.Quiz, {
                through: "QuizQuestion",
                onDelete: "CASCADE",
                hooks: true,
            });
            Question.belongsTo(models.Word, {
                foreignKey: "wordId",
                onDelete: "CASCADE",
            });
        }
    }
    Question.init({
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
            type: DataTypes.ENUM("FillGap", "Pronounce", "TypeWordByPronunciation", "TypeWordByMeaning", "ChooseMeaningByWord", "ChooseWordByMeaning", "ConnectWordsWithMeanings", "ChooseSynonymByWord", "ChooseAntonymByWord", "ChooseWordBySynonym", "ChooseWordByAntonym"),
        },
    }, {
        sequelize,
        modelName: "Question",
    });
    return Question;
};
//# sourceMappingURL=question.js.map