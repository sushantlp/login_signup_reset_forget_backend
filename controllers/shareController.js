"use strict";

// Import
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Import Model
const userModel = require("../models/user");
const resetEmailHash = require("../models/reset_email_hash");

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
module.exports.logicLogin = async (email, password) => {
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

// Logic Forget Password
module.exports.logicForgetPassword = async email => {
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

    const hash = bcrypt.hashSync(email, saltRounds);

    const link = `http://localhost:8080/api/v1/reset?logic=${hash}`;

    // Update Reset Email Hash
    await resetEmailHash.updateResetEmailHash(userData[0].user_id, 0);

    // Keep Reset Email Hash
    resetEmailHash.keepResetEmailHash(userData[0].user_id, hash, 1);

    // Logic Send Mail
    logicSendMail(email, link);

    return (responsedata = {
      success: true,
      msg: "Success!!! please check your mail inbox"
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// Logic Send Mail
const logicSendMail = (email, link) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: "sushantsingh.1081@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Reset password", // Subject line
    text: "Click link for reset your password", // plain text body
    html: link // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(
      "Message %s sent: %s",
      info.messageId,
      info.response
    );
  });
};

// Logic Reset Password
module.exports.logicResetPassword = async (hash, password) => {
  try {
    // Intialize
    let responsedata = {};

    // Read Reset Email Hash
    const reset = await resetEmailHash.readResetEmailHash("*", email, 1);

    // Check Reset Already Exist
    if (reset.length <= 0) {
      return (responsedata = {
        success: false,
        msg: "Reset link not found"
      });
    }

    if (reset[0].hash === hash) {
      const hashPassword = bcrypt.hashSync(password, saltRounds);

      // Update User Password
      userModel.updateUserPassword(reset[0].user_id, hashPassword);

      return (responsedata = {
        success: true,
        msg: "Successful login"
      });
    } else {
      return (responsedata = {
        success: false,
        msg: "Wrong reset link"
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
