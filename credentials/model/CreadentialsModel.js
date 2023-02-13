const mongoose = require("mongoose");

const CredentialsScheme = new mongoose.Schema(
  {
    user_name: String,
    user_password: String,
    phone_number: { type: String, default: null },
    email_address: String,
    role: { type: String, default: "User" },
    user_is_verified: { type: Boolean, default: null },
    verify: {
      otp: { type: Number, default: null },
      iat: Date,
      exp: Date,
    },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
const Credentials = mongoose.model("Credentials", CredentialsScheme);
module.exports = { Credentials, CredentialsScheme };
