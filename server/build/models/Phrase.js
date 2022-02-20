"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Phrase extends sequelize_1.Model {
        static associate(models) {
            Phrase.belongsTo(models.Word, {
                foreignKey: "wordId",
                onDelete: "CASCADE",
            });
        }
    }
    Phrase.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        phrase: {
            type: DataTypes.STRING,
            validate: { len: [5, 255] },
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Phrase",
    });
    return Phrase;
};
//# sourceMappingURL=phrase.js.map