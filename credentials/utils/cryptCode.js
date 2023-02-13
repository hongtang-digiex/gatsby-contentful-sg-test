const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Credentials } = require("../model/CreadentialsModel");

const jwt_encode = (data) => {
  const parsed_data = {
    id: data?._id,
    user_name: data?.user_name,
    phone_number: data?.phone_number,
    email_address: data?.email_address,
    role: data?.role,
    user_is_verified: data?.user_is_verified,
  };

  return jwt.sign(
    {
      // exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: parsed_data,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "30days",
    }
  );
};
// config key to encode password
const encode = (user, res) => {
  const saltRounds = 10;
  bcrypt.hash(user.user_password, saltRounds, async function (err, hash) {
    const hashed_user = new Credentials({
      ...user,
      user_password: hash,
    });
    if (hashed_user) {
      await hashed_user.save();
      res.status(200).json({
        status: true,
        token: jwt_encode(hashed_user),
      });
    } else {
      res.status(400).json({ status: false, message: err });
    }
  });
};

const encode_rs = async (id, reset_password, res) => {
  const saltRounds = 10;
  bcrypt.hash(reset_password, saltRounds, async function (err, hash) {
    await Credentials.updateOne(
      { _id: id },
      {
        $set: {
          user_password: hash,
        },
      }
    );
    res
      .status(200)
      .json({ status: true, message: "Reset Password successfully" });
  });
};

const decode = (password, user, res) => {
  bcrypt.compare(password, user?.user_password, async function (err, result) {
    if (result) {
      res.status(200).json({
        status: true,
        message: "Login successfully",
        token: jwt_encode(user),
      });
    } else {
      res.status(400).json({ status: false, message: "Login failed" });
    }
  });
};

const jwt_decode = (token) => {
  const jwt_key = process.env.SECRET_KEY;
  return jwt.verify(token, jwt_key, function (err, decoded) {
    if (err) {
      return err;
    } else {
      if (isInThePast(decoded?.exp)) return decoded;
      else return false;
    }
  });
};

function isInThePast(exp) {
  const today = Date.now();

  return exp > today;
}

module.exports = {
  decode,
  encode,
  encode_rs,
  jwt_encode,
  jwt_decode,
  isInThePast,
};
