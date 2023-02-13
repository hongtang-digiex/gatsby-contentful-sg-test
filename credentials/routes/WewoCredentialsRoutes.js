const express = require("express");
const CredentialsRouter = express.Router();
const { sign_in, sign_up, verify } = require("../controller/credController");
const {
  forgot,
  reset_password,
  refresh_otp,
} = require("../controller/updateCredController");

// sign_up
CredentialsRouter.post("/sign-up", new sign_up().wewo);
// sign_in
CredentialsRouter.post("/sign-in", sign_in);
// verify_otp
CredentialsRouter.post("/verify", verify);
// request-pass-request
CredentialsRouter.post("/request-mail", forgot);
// reset-pass
CredentialsRouter.post("/reset", reset_password);
// refresh-pass
CredentialsRouter.post("/refresh-otp", refresh_otp);

module.exports = CredentialsRouter;
