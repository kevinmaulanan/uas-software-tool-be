const { Material, Category } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const { response } = require("express");

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

exports.MaterialList = async (req, res) => {
  try {
    let { search } = req.query;
    search = search ?? "";
    let materials = await Material.findAll({
      where: {
        materialTitle: { [Op.iLike]: `%${search}%` },
      },
    });

    res.status(200).send(materials);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.MaterialDetail = async (req, res) => {
  try {
    let { params } = req;
    CheckParamsInteger(params);
    let material = await Material.findByPk(params.id);

    if (!material) throw new Error("Material tidak di temukan");

    res.status(200).send(material);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.MaterialCreated = async (req, res) => {
  try {
    let response = {
      success: false,
      code: 400,
    };
    [("materialText", "materialTitle", "categoryId")].map(v => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, [
      "materialTitle",
      "materialVideo",
      "materialPDF",
      "materialText",
      "categoryId",
    ]);

    let category = await Category.findByPk(body.categoryId);

    if (category) {
      let material = await Material.findOne({
        where: { materialTitle: body.materialTitle },
      });

      if (material === null) {
        material = await Material.create(body);
        response = {
          success: true,
          code: 200,
          material,
        };
      } else {
        response.message = "Error, Material Title sudah digunakan";
      }
    } else {
      response.message = "Category tidak di temukan";
    }

    res.status(response.code).send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
