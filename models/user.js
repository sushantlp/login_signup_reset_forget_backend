"use strict";

const moment = require("moment");
const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read User Record
module.exports.readUserRecord = async (select, email, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM users WHERE email=? AND status=? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [email, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep User Record
module.exports.keepUserRecord = async (email, name, password) => {};
/**
 * End Database Read and Write
 */
