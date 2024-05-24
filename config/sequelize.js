const Sequelize = require("sequelize");
require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "Kevin137",
    database: process.env.DB_NAME || "bnsp",
    host: process.env.PG_HOST,
    dialect: "postgres",
    logging: false,
    operatorsAliases: Sequelize.Op,
  },
};
