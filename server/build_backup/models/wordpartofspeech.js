"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class WordPartOfSpeech extends sequelize_1.Model {
    }
    WordPartOfSpeech.init({
        PartOfSpeechId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "PartOfSpeech",
                key: "id",
            },
        },
        WordId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Word",
                key: "id",
            },
        },
    }, {
        sequelize,
        modelName: "WordPartOfSpeech",
    });
    return WordPartOfSpeech;
};
//# sourceMappingURL=wordpartofspeech.js.map