"use strict";

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

    // Keep User Record
    await userModel.keepUserRecord(email, name, password);

    return (responsedata = {
      success: true,
      msg: "Successful registration please login"
    });
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
