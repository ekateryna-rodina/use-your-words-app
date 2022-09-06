"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Quiz extends sequelize_1.Model {
        static associate(models) {
            Quiz.belongsToMany(models.Question, {
                through: "QuizQuestion",
                onDelete: "CASCADE",
                hooks: true,
            });
        }
    }
    Quiz.init({
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
    }, {
        sequelize,
        modelName: "Quiz",
    });
    return Quiz;
};
//# sourceMappingURL=quiz.js.map