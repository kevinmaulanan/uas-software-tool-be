const jwt = require("jsonwebtoken");
const { Experience, User } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

exports.GetExperiences = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await Experience.findAndCountAll({
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
      where: {
        [Op.or]: {
          "$User.email$": { [Op.iLike]: `%${search}%` },
          "$User.name$": { [Op.iLike]: `%${search}%` },
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

exports.FindExperience = async (req, res) => {
  try {
    let experience = await Experience.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });

    if (!experience) {
      throw new Error("Experience tidak di temukan");
    }

    res.status(200).send(experience);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CreateExperience = async (req, res) => {
  try {
    let user = User.findOne({
      where: { id: req.body.useriD },
    });
    if (!user) {
      throw new Error("Experience tidak di temukan");
    }

    let experience = await Experience.create({
      ...req.body,
    });
    res.status(200).send(experience);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UpdateExperience = async (req, res) => {
  try {
    let experience = await Experience.findByPk(req.params.id);

    if (!experience) {
      throw new Error("Experience tidak di temukan");
    }

    let user = User.findOne({
      where: { id: req.body.useriD },
    });
    if (!user) {
      throw new Error("Experience tidak di temukan");
    }

    experience = await experience.update({
      ...req.body,
    });

    res.status(200).send(experience);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.DeleteExperience = async (req, res) => {
  try {
    let experience = await Experience.findByPk(req.params.id);
    if (!experience) throw new Error("Experience tidak di temukan");
    experience = await experience.destroy();

    return res.status(200).json(experience);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
