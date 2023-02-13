const jwt = require("jsonwebtoken");

const jwt_decode = (token) => {
  const jwt_key = process.env.SECRET_KEY;
  return jwt.verify(token, jwt_key, function (err, decoded) {
    if (err) {
      return err;
    } else {
      if (
        decoded?.data?.role == "Admin" &&
        isInThePast(decoded?.exp) &&
        decoded?.data?.user_isVerified == true
      ) {
        return {
          decoded,
          status: true,
        };
      } else {
        console.log(decoded?.data?.role);
        return {
          staus: false,
          message: [
            decoded?.data?.role == "Admin"
              ? undefined
              : "You are not allowed to create store",
            isInThePast(decoded?.exp) ? undefined : "Token expired",

            decoded?.data?.user_isVerified == true
              ? undefined
              : "You have to verify account first",
          ],
        };
      }
    }
  });
};

function isInThePast(exp) {
  const today = Date.now();

  return exp < today;
}

module.exports = { jwt_decode };
