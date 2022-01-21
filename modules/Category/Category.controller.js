const { Category, Material, SubCategory } = require("../../models");
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
      include: SubCategory,
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
      include: SubCategory,
    });

    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CategoryCreated = async (req, res) => {
  try {
    let body = ["category", "question", "pointReward"];
    body.map(v => {
      console.log(v);
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    body = _.pick(req.body, [...body, "link_icon"]);

    let category = await Category.create(body);

    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
