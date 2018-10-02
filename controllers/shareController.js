"use strict";

// Import
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Import Model
const userModel = require("../models/user");

// Logic Signup
module.exports.logicSignup = async (email, name, password) => {
  try {
    // Intialize
    let responsedata = {};

    // Read User Record
    const userData = await userModel.readUserRecord("*", email, 1);

    // Check Email Already Exist
    if (userData.length > 0) {
      return (responsedata = {
        success: false,
        msg: "You already signup please login"
      });
    }

    const hash = bcrypt.hashSync(password, saltRounds);

    // Keep User Record
    await userModel.keepUserRecord(email, name, hash, 1);

    return (responsedata = {
      success: true,
      msg: "Successful registration please login"
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logic Logic
module.exports.logicLogic = async (email, password) => {
  try {
    // Intialize
    let responsedata = {};

    // Read User Record
    const userData = await userModel.readUserRecord("*", email, 1);

    // Check Email Already Exist
    if (userData.length <= 0) {
      return (responsedata = {
        success: false,
        msg: "User email not found"
      });
    }

    const match = await bcrypt.compare(password, userData[0].password);

    if (match) {
      return (responsedata = {
        success: true,
        msg: "Successful login"
      });
    } else {
      return (responsedata = {
        success: false,
        msg: "Wrong password"
      });
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// Create Json Object
module.exports.createJsonObject = (data, location, code, bool, metadata) => {
  return JSON.stringify({
    results: data,
    requestLocation: location,
    status: code,
    bool: bool,
    metadata: metadata
  });
};
