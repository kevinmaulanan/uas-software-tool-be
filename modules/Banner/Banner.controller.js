const jwt = require("jsonwebtoken");
const { Banner } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

exports.GetBanners = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await Banner.findAndCountAll({
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

exports.FindBanner = async (req, res) => {
  try {
    let banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      throw new Error("Banner tidak di temukan");
    }

    res.status(200).send(banner);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CreateBanner = async (req, res) => {
  try {
    let banner = await Banner.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(200).send(banner);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UpdateBanner = async (req, res) => {
  try {
    let banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      throw new Error("Banner tidak di temukan");
    }

    banner = await banner.update({
      ...req.body,
      image: req.file.filename,
    });

    res.status(200).send(banner);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.DeleteBanner = async (req, res) => {
  try {
    let banner = await Banner.findByPk(req.params.id);
    if (!banner) throw new Error("Banner tidak di temukan");
    banner = await banner.destroy();

    return res.status(200).json(banner);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
