const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

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
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ["password"] },

      where: {
        [Op.or]: {
          email: { [Op.iLike]: `%${search}%` },
          name: { [Op.iLike]: `%${search}%` },
        },
      },
      order: [["createdAt", "desc"]],
      ...paginate,
    });

    const totalPage = Math.ceil(count / limit) || 0;

    return res.status(200).json({
      success: true,
      code: 200,
      data: rows,
      totalPage,
      page,
      limit,
      count,
      search,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, code: 500, message: e.message });
  }
};
exports.PatientList = async (req, res) => {
  try {
    let { search } = req.query;
    search = search ?? "";
    let users = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        name: { [Op.iLike]: `%${search}%` },
        email: { [Op.iLike]: `%${search}%` },
        role: "USER",
      },
      order: [["createdAt", "asc"]],
    });

    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UserDetail = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
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
    const { email, password } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    ["email", "password"].map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let userLogin = await User.findOne({
      where: { email },
    });

    if (userLogin) {
      let correctPass = await userLogin.checkPassword(password);

      let user = {
        id: userLogin.id,
        email: userLogin.email,
        name: userLogin.name,
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
    const { email } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    let fields = ["email", "password", "name"];

    fields.map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, fields);

    let findUser = await User.findOne({
      where: { email },
    });

    if (findUser === null) {
      userLogin = await User.create({ ...body, role: "USER" });
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

exports.CreateUser = async (req, res) => {
  try {
    const { email } = req.body;
    let response = {
      success: false,
      code: 400,
    };

    let fields = ["email", "password", "name", "role"];

    fields.map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, fields);

    let findUser = await User.findOne({
      where: { email },
    });

    if (findUser === null) {
      userLogin = await User.create({ ...body });
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

exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    let fields = ["email", "password", "name", "role"];

    fields.map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, fields);

    let findUser = await User.findByPk(id);
    if (!findUser) throw new Error("User tidak di temukan!");

    let duplicateUser = await User.findOne({
      where: { email, id: { [Op.not]: id } },
    });

    if (duplicateUser) throw new Error("Email tidak boleh duplicate!");

    findUser = await findUser.update({ ...body });

    res.status(200).json(findUser);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    if (!user) throw new Error("GaleryPhoto tidak di temukan");
    user = await user.destroy();

    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
