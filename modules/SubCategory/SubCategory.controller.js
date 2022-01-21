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

exports.SubCategoryList = async (req, res) => {
  try {
    let { search } = req.query;
    search = search ?? "";
    let categories = await SubCategory.findAll({
      include: Material,
    });

    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.SubCategoryDetail = async (req, res) => {
  try {
    let { params } = req;
    CheckParamsInteger(params);
    let subCategory = await SubCategory.findAll({
      order: [["createdAt", "asc"]],
      where: { categoryId: params.id },
    });

    res.status(200).send(subCategory);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.SubCategoryCreated = async (req, res) => {
  try {
    let response = {
      success: false,
      code: 400,
    };
    ["subCategoryTitle", "categoryId"].map(v => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, ["subCategoryTitle", "categoryId"]);

    let category = await Category.findByPk(body.categoryId);

    if (category) {
      let subCategory = await SubCategory.findOne({
        where: { subCategoryTitle: body.subCategoryTitle },
      });

      if (subCategory === null) {
        subCategory = await SubCategory.create(body);
        response = {
          success: true,
          code: 200,
          subCategory,
        };
      } else {
        response.message = "Error, Sub Category Title sudah digunakan";
      }
    } else {
      response.message = "Category tidak di temukan";
    }

    res.status(response.code).send(response);

    res.status(200).send(subCategory);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
