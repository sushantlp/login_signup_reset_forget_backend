"use strict";

/**
 * Database Connection
 */

// Import
const Sequelize = require("sequelize");

// Sequelize Connection
module.exports.sequelizeConnection = () => {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DRIVER,
      operatorsAliases: false,
      pool: {
        max: 90,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        charset: "utf8mb4"
      },
      define: {
        underscored: false,
        freezeTableName: false,
        timestamps: true
      }
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};
