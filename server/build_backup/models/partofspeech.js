"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PartOfSpeech extends sequelize_1.Model {
        static associate(models) {
            PartOfSpeech.belongsToMany(models.Word, {
                through: "WordPartOfSpeech",
            });
        }
    }
    PartOfSpeech.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        part: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: "PartOfSpeech",
    });
    return PartOfSpeech;
};
//# sourceMappingURL=partofspeech.js.map