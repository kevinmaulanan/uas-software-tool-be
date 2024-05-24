const jwt = require("jsonwebtoken");
const { Article } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

exports.GetArticles = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await Article.findAndCountAll({
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

exports.FindArticle = async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id);

    if (!article) {
      throw new Error("Article tidak di temukan");
    }

    res.status(200).send(article);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CreateArticle = async (req, res) => {
  try {
    let article = await Article.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(200).send(article);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UpdateArticle = async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id);

    if (!article) {
      throw new Error("Article tidak di temukan");
    }

    article = await article.update({
      ...req.body,
      image: req.file.filename,
    });

    res.status(200).send(article);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.DeleteArticle = async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id);
    if (!article) throw new Error("Article tidak di temukan");
    article = await article.destroy();

    return res.status(200).json(article);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
