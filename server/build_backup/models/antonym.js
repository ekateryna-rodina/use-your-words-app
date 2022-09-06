"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Antonym extends sequelize_1.Model {
        static associate(models) {
            Antonym.belongsTo(models.Word, {
                foreignKey: "wordId",
                onDelete: "CASCADE",
            });
        }
    }
    Antonym.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        antonym: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Antonym",
    });
    return Antonym;
};
//# sourceMappingURL=antonym.js.map