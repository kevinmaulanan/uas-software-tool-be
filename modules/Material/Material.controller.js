const { Material, SubCategory } = require("../../models");
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

exports.MaterialListByCategory = async (req, res) => {
  try {
    let { params } = req;
    CheckParamsInteger(params);
    let materials = await Material.findAll({
      order: [["createdAt", "asc"]],
      where: { subCategoryId: params.id },
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
    [("materialText", "materialTitle", "subCategoryId")].map(v => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, [
      "materialTitle",
      "materialVideo",
      "materialPDF",
      "materialText",
      "subCategoryId",
    ]);

    let category = await SubCategory.findByPk(body.subCategoryId);

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
