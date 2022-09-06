"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Synonym extends sequelize_1.Model {
        static associate(models) {
            Synonym.belongsTo(models.Word, {
                foreignKey: "wordId",
                onDelete: "CASCADE",
            });
        }
    }
    Synonym.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        synonym: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Synonym",
    });
    return Synonym;
};
//# sourceMappingURL=synonym.js.map