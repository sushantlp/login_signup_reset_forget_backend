"use strict";

// Controller
const shareController = require("./shareController");

// Utils
const { EMAIL_REG } = require("../utils/constants");

// Request Merchant Signup
module.exports.requestAppSignup = (req, res) => {
  if (
    req.query.email !== undefined &&
    req.query.email !== "" &&
    req.query.name !== undefined &&
    req.query.name !== "" &&
    req.query.password !== undefined &&
    req.query.password !== ""
  ) {
    // Extract Parameter
    const email = req.query.email;
    const name = req.query.name;
    const password = req.query.password;

    // Validate Email
    if (!EMAIL_REG.test(email)) {
      return res.status(400).send("Email is not valid");
    }

    // Logic App Signup
    return shareController
      .logicSignup(email, name, password)
      .then(response => {
        // Intialize
        const metadata = { type: email };

        return res
          .status(200)
          .send(
            shareController.createJsonObject(
              response.msg,
              "/api/v1/signup",
              200,
              response.success,
              metadata
            )
          );
      })
      .catch(error => {
        return res.status(500).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};