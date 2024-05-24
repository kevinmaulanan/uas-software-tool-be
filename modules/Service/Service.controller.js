const jwt = require("jsonwebtoken");
const { Service } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

exports.GetServices = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await Service.findAndCountAll({
      where: {
        [Op.or]: {
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

exports.FindService = async (req, res) => {
  try {
    let service = await Service.findByPk(req.params.id);

    if (!service) {
      throw new Error("Service tidak di temukan");
    }

    res.status(200).send(service);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CreateService = async (req, res) => {
  try {
    let service = await Service.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(200).send(service);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UpdateService = async (req, res) => {
  try {
    let service = await Service.findByPk(req.params.id);

    if (!service) {
      throw new Error("Service tidak di temukan");
    }

    service = await service.update({
      ...req.body,
      image: req.file.filename,
    });

    res.status(200).send(service);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.DeleteService = async (req, res) => {
  try {
    let service = await Service.findByPk(req.params.id);
    if (!service) throw new Error("Service tidak di temukan");
    service = await service.destroy();

    return res.status(200).json(service);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
