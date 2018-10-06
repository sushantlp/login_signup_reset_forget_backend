"use strict";
const moment = require("moment");
const mysql = require("mysql2/promise");

module.exports = (sequelize, DataTypes) => {
  var ResetEmailHash = sequelize.define(
    "reset_email_hashes",
    {
      user_id: DataTypes.STRING,
      hash: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  ResetEmailHash.associate = function(models) {
    // associations can be defined here
  };
  return ResetEmailHash;
};

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

/**
 * Start Database Read and Write
 */

// Read Reset Email Hash
module.exports.readResetEmailHash = async (select, userId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query = `SELECT ${select} FROM reset_email_hashes WHERE user_id=? AND status=? LIMIT 1`;

    // Query Database
    const [rows, fields] = await connection.execute(query, [userId, status]);

    connection.close();

    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Keep Reset Email Hash
module.exports.keepResetEmailHash = async (userId, hash, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "INSERT INTO `reset_email_hashes` (`user_id`, `hash`, `status`, `created_at`, `updated_at`) VALUES (?,?,?,?,?)";

    // Query Database
    const row = await connection.execute(query, [
      userId,
      hash,
      status,
      now,
      now
    ]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Reset Email Hash
module.exports.updateResetEmailHash = async (userId, status) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Query
    const query =
      "UPDATE `sms` SET `status` = ?, `updated_at` = ? WHERE `user_id` = ?";

    // Query Database
    const row = await connection.execute(query, [status, now, userId]);

    connection.close();

    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
