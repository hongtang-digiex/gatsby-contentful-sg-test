const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const { OAuth2Client } = require("google-auth-library");

const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
  sendOtpEmail: async (email) =>
    new Promise(async (resolve, reject) => {
      try {
        const otpCode = Math.floor(100000 + Math.random() * 899999);
        // token
        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        const myAccessToken = myAccessTokenObject?.token;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,

          auth: {
            type: "OAuth2",
            user: process.env.ADMIN_EMAIL_ADDRESS,
            clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
            clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken,
          },
        });

        // handlebar processing
        const handlebarOptions = {
          viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./view"),
            defaultLayout: false,
          },
          viewPath: path.resolve("./view"),
          extName: ".handlebars",
        };

        transporter.use("compile", hbs(handlebarOptions));
        if (validateEmail(email)) {
          // send mail with defined transport object
          const clindOtpCode = {
            from: "Wewo Administrator", // sender address
            to: email, // list of receivers
            subject: "Wewo Email Verification",
            template: "email",
            context: {
              otp: otpCode,
            },
          };
          transporter.sendMail(clindOtpCode, (error, info) => {
            if (error) reject(error);
            resolve(otpCode);
          });
        } else {
          reject("Invalid email");
        }
      } catch (err) {
        reject(err);
      }
    }),

  sendForgotPassEmailRq: async (email, user) =>
    new Promise(async (resolve, reject) => {
      try {
        // token
        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        const myAccessToken = myAccessTokenObject?.token;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,

          auth: {
            type: "OAuth2",
            user: process.env.ADMIN_EMAIL_ADDRESS,
            clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
            clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken,
          },
        });

        // handlebar processing
        const handlebarOptions = {
          viewEngine: {
            extName: ".reset_pass.handlebars",
            partialsDir: path.resolve("./view"),
            defaultLayout: false,
          },
          viewPath: path.resolve("./view"),
          extName: ".reset_pass.handlebars",
        };

        transporter.use("compile", hbs(handlebarOptions));
        if (validateEmail(email)) {
          // send mail with defined transport object
          const clindResetPass = {
            from: "Wewo Administrator", // sender address
            to: email, // list of receivers
            subject: "Wewo Reset Password Request",
            template: "email",
            context: {
              message: "Reset Password",
              link: `/auth/reset-password/${user._id}`,
            },
          };
          transporter.sendMail(clindResetPass, (error, info) => {
            if (error) reject(error);
            resolve(clindResetPass.context);
          });
        } else {
          reject("Invalid email");
        }
      } catch (err) {
        reject(err);
      }
    }),
};
