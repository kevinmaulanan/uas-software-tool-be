const jwt = require("jsonwebtoken");
const { User, Semester } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");

const CheckParamsInteger = (params) => {
  try {
    Object.keys(params).map((key) => {
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
    search = search ?? "";
    let users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: Semester,
      where: {
        npm: { [Op.iLike]: `%${search}%` },
        name: { [Op.iLike]: `%${search}%` },
      },
      order: [["createdAt", "asc"]]
    });

    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.Profile = async (req, res) => {
  try {
    let user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: Semester,
    });

    if (!user) {
      throw new Error("User tidak di temukan");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UserDetail = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: Semester,
    });

    if (!user) {
      throw new Error("User tidak di temukan");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.Login = async (req, res) => {
  try {
    const { npm, password } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    ["npm", "password"].map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let userLogin = await User.findOne({
      where: { npm },
    });

    if (userLogin) {
      let correctPass = await userLogin.checkPassword(password);

      let user = {
        id: userLogin.id,
        name: userLogin.name,
        npm: userLogin.npm,
        role: userLogin.role,
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
    const { npm } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    ["npm", "password", "name", "semesterId"].map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, ["npm", "password", "name", "semesterId"]);

    let findUser = await User.findOne({
      where: { npm },
    });

    if (findUser === null) {
      let semester = await Semester.findByPk(body.semesterId);
      if (semester) {
        userLogin = await User.create({ ...body, role: "MAHASISWA" });
        response = {
          success: true,
          code: 200,
          message: "User berhasil dibuat",
        };
      } else {
        response.message = "Semester tidak ditemukan!";
      }
    } else {
      response.message = "Email or Username sudah terdaftar";
    }

    res.status(response.code).json(response);
  } catch (e) {
    res.status(400).json({ success: false, code: 400, message: e.message });
  }
};
