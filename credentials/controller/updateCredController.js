const asyncHandler = require("express-async-handler");

const { Credentials } = require("../model/CreadentialsModel");
const { encode_rs } = require("../utils/cryptCode");
const { sendForgotPassEmailRq } = require("../smshandler/nodemailer");
const { sendOtpEmail } = require("../smshandler/nodemailer");

const validator = require("../utils/validator.json");

const forgot = asyncHandler(async (req, res) => {
  try {
    const { email_address } = req.body;
    const user = await Credentials.findOne({ email_address: email_address });
    if (email_address && user) {
      sendForgotPassEmailRq(email_address, user)
        .then((value) => {
          res.status(200).json({
            status: true,
            data: value,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: false,
            message: err.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        message: "Bad request",
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

const reset_password = asyncHandler(async (req, res) => {
  try {
    const { id, reset_password, confirm_reset_pw } = req.body;
    const isValidPass = new RegExp(validator.password_regex).test(
      reset_password
    );
    if (id && reset_password && confirm_reset_pw) {
      if (isValidPass)
        if (reset_password === confirm_reset_pw) {
          await encode_rs(id, reset_password, res);
        } else {
          res.status(400).json({
            status: false,
            message: "Reset Password should be matched",
          });
        }
      else {
        res.status(400).json({
          status: false,
          message: "Invalid Reset Password",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Bad request",
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

const refresh_otp = asyncHandler(async (req, res) => {
  try {
    const { email_address } = req.body;
    const user = await Credentials.findOne({ email_address: email_address });
    let otp = await sendOtpEmail(email_address)
      .then((otp_code) => otp_code)
      .catch((err) => {
        res.status(400).json({
          status: false,
          message: err,
        });
      });

    if (otp && user != null) {
      if (!user?.user_is_verified) {
        const date = new Date();
        await Credentials.findOneAndUpdate(
          { email_address: email_address },
          {
            $set: {
              verify: {
                otp: otp,
                iat: new Date().getTime(),
                exp: new Date(date.getTime() + 5 * 60000).getTime(),
              },
            },
          }
        );
        res.status(200).json({
          status: true,
          new_otp: otp,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "This email has been verified",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "This email are not existed",
      });
    }
    console.log(user);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = {
  forgot,
  reset_password,
  refresh_otp,
};
