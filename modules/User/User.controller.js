const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");

const CheckParamsInteger = params => {
  try {
    Object.keys(params).map(key => {
      if (!params[key] || params[key] === "" || isNaN(params[key])) {
        throw new Error(`${key} must be number`);
      }
    });

    return true;
  } catch (e) {
    throw e;
  }
};

exports.UserList = async (req, res) => {
  try {
    let { search } = req.query;
    let text = "";
    search = search ?? "";
    let users = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        email: { [Op.iLike]: `%${search}%` },
        name: { [Op.iLike]: `%${search}%` },
      },
    });

    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.Profile = async (req, res) => {
  try {
    let user = await User.findByPk(req.user.id);

    if (user) {
      delete user.dataValues.password;
    } else throw new Error("User tidak di temukan");

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    ["email", "password"].map(v => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let userLogin = await User.findOne({
      where: { email },
    });

    if (userLogin) {
      let correctPass = await userLogin.checkPassword(password);

      let user = {
        id: userLogin.id,
        name: userLogin.name,
        email: userLogin.email,
        username: userLogin.username,
      };

      if (correctPass) {
        let token = jwt.sign(user, process.env.JWT_KEY);
        response = {
          success: true,
          code: 200,
          token,
          user,
        };
      } else {
        response.message = `Wrong email or password`;
      }
    }

    res.status(response.code).json(response);
  } catch (e) {
    res.status(400).json({ success: false, code: 400, message: e.message });
  }
};

exports.Register = async (req, res) => {
  try {
    const { email, username } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    ["email", "password", "username"].map(v => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, ["email", "password", "username"]);

    let userLogin = await User.findOne({
      where: {
        [Op.or]: {
          email,
          username,
        },
      },
    });

    if (userLogin === null) {
      userLogin = await User.create({ ...body, name: username });
      response = {
        success: true,
        code: 200,
        message: "User berhasil dibuat",
      };
    } else {
      response.message = "Email or Username sudah terdaftar";
    }

    res.status(response.code).json(response);
  } catch (e) {
    res.status(400).json({ success: false, code: 400, message: e.message });
  }
};
