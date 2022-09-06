"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Meaning extends sequelize_1.Model {
        static associate(models) {
            Meaning.belongsTo(models.Word, {
                foreignKey: "wordId",
                onDelete: "CASCADE",
            });
        }
    }
    Meaning.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        meaning: {
            type: DataTypes.STRING,
            validate: { len: [5, 255] },
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Meaning",
    });
    return Meaning;
};
//# sourceMappingURL=meaning.js.map