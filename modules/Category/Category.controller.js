const { Category, Material } = require("../../models");
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

exports.CategoryList = async (req, res) => {
  try {
    let { search } = req.query;
    search = search ?? "";
    let categories = await Category.findAll({
      include: Material,
      where: {
        category: { [Op.iLike]: `%${search}%` },
      },
    });

    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CategoryDetail = async (req, res) => {
  try {
    let { params } = req;
    CheckParamsInteger(params);
    let category = await Category.findByPk(params.id, {
      include: Material,
    });

    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CategoryCreated = async (req, res) => {
  try {
    ["category"].map(v => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, ["category", "link_icon"]);

    let category = await Category.create(body);

    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
