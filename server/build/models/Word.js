"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Word extends sequelize_1.Model {
        static associate(models) {
            Word.belongsToMany(models.PartOfSpeech, {
                through: "WordPartOfSpeech",
            });
            Word.hasMany(models.Meaning, {
                foreignKey: "wordId",
            });
            Word.hasMany(models.Phrase, {
                foreignKey: "wordId",
            });
            Word.hasMany(models.Synonym, {
                foreignKey: "wordId",
            });
            Word.hasMany(models.Antonym, {
                foreignKey: "wordId",
            });
        }
    }
    Word.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        word: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fileUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFreeze: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "Word",
    });
    return Word;
};
//# sourceMappingURL=word.js.map