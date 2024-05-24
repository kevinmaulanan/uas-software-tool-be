const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.AdminAuth = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    let decoded = jwt.decode(authorization);
    let activeUser = await User.findOne({
      where: { id: decoded.id },
    });
    if (activeUser && decoded.email === "superadmin@gmail.com") {
      req.user = decoded;
      next();
    } else {
      res.status(401).json("Kamu bukan Admin!");
    }
  } catch (e) {
    res.status(401).json("user is not Authorized");
  }
};

exports.UserAuth = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    let decoded = jwt.decode(authorization);
    let activeUser = await User.findOne({
      where: { id: decoded.id },
    });

    if (activeUser) {
      req.user = decoded;
      return next();
    } else {
      return res.status(401).json({
        success: false,
        code: 401,
        message: "User is not Authorized",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({
      success: false,
      code: 401,
      message: "User is not Authorizeds",
    });
  }
};
