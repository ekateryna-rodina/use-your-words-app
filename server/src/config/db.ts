import { Sequelize } from "sequelize";

const db = new Sequelize("uyw-db", "katerynarodina", "kariedb", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
