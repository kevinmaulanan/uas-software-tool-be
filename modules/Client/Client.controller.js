const jwt = require("jsonwebtoken");
const { Client } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const Helper = require("../../helpers");

exports.GetClients = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search ? search : "";

    const paginate = Helper.GetPagination(page, limit);

    let { count, rows } = await Client.findAndCountAll({
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

exports.FindClient = async (req, res) => {
  try {
    let client = await Client.findByPk(req.params.id);

    if (!client) {
      throw new Error("Client tidak di temukan");
    }

    res.status(200).send(client);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.CreateClient = async (req, res) => {
  try {
    let client = await Client.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(200).send(client);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.UpdateClient = async (req, res) => {
  try {
    let client = await Client.findByPk(req.params.id);

    if (!client) {
      throw new Error("Client tidak di temukan");
    }

    client = await client.update({
      ...req.body,
      image: req.file.filename,
    });

    res.status(200).send(client);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.DeleteClient = async (req, res) => {
  try {
    let client = await Client.findByPk(req.params.id);
    if (!client) throw new Error("Client tidak di temukan");
    client = await client.destroy();

    return res.status(200).json(client);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
