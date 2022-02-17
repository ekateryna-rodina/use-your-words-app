"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db = new sequelize_1.Sequelize("uyw-db", "katerynarodina", "kariedb", {
    host: "localhost",
    dialect: "postgres",
});
exports.default = db;
//# sourceMappingURL=db.js.map