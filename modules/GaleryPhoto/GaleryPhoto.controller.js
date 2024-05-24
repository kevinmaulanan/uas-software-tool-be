const jwt = require("jsonwebtoken");
const { GaleryPhoto } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

exports.GetGaleryPhotos = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await GaleryPhoto.findAndCountAll({
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

exports.FindGaleryPhoto = async (req, res) => {
  try {
    let galeryPhoto = await GaleryPhoto.findByPk(req.params.id);

    if (!galeryPhoto) {
      throw new Error("GaleryPhoto tidak di temukan");
    }

    res.status(200).send(galeryPhoto);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CreateGaleryPhoto = async (req, res) => {
  try {
    let galeryPhoto = await GaleryPhoto.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(200).send(galeryPhoto);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UpdateGaleryPhoto = async (req, res) => {
  try {
    let galeryPhoto = await GaleryPhoto.findByPk(req.params.id);

    if (!galeryPhoto) {
      throw new Error("GaleryPhoto tidak di temukan");
    }

    galeryPhoto = await galeryPhoto.update({
      ...req.body,
      image: req.file.filename,
    });

    res.status(200).send(galeryPhoto);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.DeleteGaleryPhoto = async (req, res) => {
  try {
    let galeryPhoto = await GaleryPhoto.findByPk(req.params.id);
    if (!galeryPhoto) throw new Error("GaleryPhoto tidak di temukan");
    galeryPhoto = await galeryPhoto.destroy();

    return res.status(200).json(galeryPhoto);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
