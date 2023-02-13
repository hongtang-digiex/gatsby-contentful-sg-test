const asyncHandler = require("express-async-handler");
const validator = require("../utils/validator.json");

const { Credentials } = require("../model/CreadentialsModel");
const { decode, encode, isInThePast } = require("../utils/cryptCode");
const { sendOtpEmail } = require("../smshandler/nodemailer");

const verify = asyncHandler(async (req, res) => {
  try {
    const { user_id, verify_otp } = req.body;
    const identity = (await Credentials.findOne({ _id: user_id })).verify;
    console.log(identity?.otp == parseInt(verify_otp));
    console.log(isInThePast(identity?.exp));
    if (identity?.otp == parseInt(verify_otp) && isInThePast(identity?.exp)) {
      await Credentials.findByIdAndUpdate(
        {
          _id: user_id,
        },
        {
          identity,
          $unset: { verify: 1 } /* remove otp field */,
          $set: { user_is_verified: true },
        }
      );
      res.status(200).json({
        status: true,
        message: "Verify successfully",
      });
    } else {
      res.status(400).json({ status: false, message: "Verify failed" });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
});

const errorListMsg = async (username, email, phone, pw, confirm_pw) => {
  const password_regex = new RegExp(validator.password_regex);
  const errorsList = [];

  const usernameList = await Credentials.find({ user_name: username });
  const emailList = await Credentials.find({ email_address: email });
  const phoneNumberList = await Credentials.find({ phone_number: phone });

  if (usernameList?.length > 0)
    errorsList.push("This Username is already in use");

  if (emailList?.length > 0) errorsList.push("This Email is already in use");

  if (phoneNumberList?.length > 0)
    errorsList.push("This Phone Number has been used");

  if (!password_regex.test(pw)) {
    errorsList.push("Invalid Password");
  } else {
    if (pw !== confirm_pw)
      errorsList.push("Password doesn't match with Confirm Password");
  }
  return errorsList;
};
class sign_up {
  constructor() {}

  async finvi(req, res) {
    try {
      const {
        user_name,
        user_password,
        confirm_user_password,
        phone_number,
        email_address,
        role,
      } = req.body;

      if (
        !(user_name && user_password && confirm_user_password && email_address)
      ) {
        if (!user_name) {
          res
            .status(400)
            .json({ status: false, message: "Username is required" });
        }
        if (!user_password) {
          res
            .status(400)
            .json({ status: false, message: "Password is required" });
        }

        if (!confirm_user_password) {
          res
            .status(400)
            .json({ status: false, message: "Confirm password is required" });
        }
        if (!email_address) {
          res.status(400).json({ status: false, message: "Email is required" });
        }

        if (!phone_number) {
          res
            .status(400)
            .json({ status: false, message: "Phone Number is required" });
        }
      } else {
        const errlist = await errorListMsg(
          user_name,
          email_address,
          phone_number,
          user_password,
          confirm_user_password
        )
          .then((list) => list)
          .catch((err) => {
            res.status(400).json({ status: false, message: err });
          });
        if (errlist?.length > 0)
          res.status(400).json({ status: false, message: errlist });
        else {
          const user = {
            user_name,
            user_password,
            phone_number,
            email_address,
            // created_date: Date.now(),
            user_is_verified: false,
            role,
          };

          await sendOtpEmail(user.email_address)
            .then((otp_code) => {
              const date = new Date();

              user.verify = {
                otp: otp_code,
                iat: new Date().getTime(),
                exp: new Date(date.getTime() + 5 * 60000).getTime(),
              };
              console.log(user);

              encode(user, res);
            })
            .catch((err) => {
              res.status(400).json({
                status: false,
                message: err,
              });
            });
        }
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }

  async wewo(req, res) {
    try {
      const {
        user_name,
        user_password,
        confirm_user_password,
        phone_number,
        email_address,
      } = req.body;

      if (
        !(user_name && user_password && confirm_user_password && email_address)
      ) {
        if (!user_name) {
          res
            .status(400)
            .json({ status: false, message: "Username is required" });
        }
        if (!user_password) {
          res
            .status(400)
            .json({ status: false, message: "Password is required" });
        }

        if (!confirm_user_password) {
          res
            .status(400)
            .json({ status: false, message: "Confirm password is required" });
        }
        if (!email_address) {
          res.status(400).json({ status: false, message: "Email is required" });
        }

        if (!phone_number) {
          res
            .status(400)
            .json({ status: false, message: "Phone Number is required" });
        }
      } else {
        const errlist = await errorListMsg(
          user_name,
          email_address,
          phone_number,
          user_password,
          confirm_user_password
        )
          .then((list) => list)
          .catch((err) => {
            res.status(400).json({ status: false, message: err });
          });
        if (errlist?.length > 0)
          res.status(400).json({ status: false, message: errlist });
        else {
          const user = {
            user_name,
            user_password,
            phone_number,
            email_address,
            // created_date: Date.now(),
            user_is_verified: false,
            role: "User",
          };

          await sendOtpEmail(user.email_address)
            .then((otp_code) => {
              const date = new Date();

              user.verify = {
                otp: otp_code,
                iat: new Date().getTime(),
                exp: new Date(date.getTime() + 5 * 60000).getTime(),
              };
              // console.log(user);

              encode(user, res);
            })
            .catch((err) => {
              res.status(400).json({
                status: false,
                message: err,
              });
            });
        }
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }
}
const sign_in = asyncHandler(async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    if (user_name && user_password) {
      const user = await Credentials.find({ user_name: user_name });

      decode(user_password, user[0], res);
    } else {
      res.status(400).json({ status: false, message: "Bad Request" });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
});

module.exports = {
  sign_up,
  sign_in,
  verify,
};
