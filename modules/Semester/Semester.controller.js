const jwt = require("jsonwebtoken");
const { User, Semester } = require("../../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const moment = require("moment");

const CheckParamsInteger = (params) => {
  try {
    Object.keys(params).map((key) => {
      if (!params[key] || params[key] === "" || isNaN(params[key])) {
        throw new Error(`${key} must be number`);
      }
    });

    return true;
  } catch (e) {
    throw e;
  }
};

exports.SemesterList = async (req, res) => {
  try {
    let semesters = await Semester.findAll({
      order: [["semester", "asc"]],
    });

    res.status(200).send(semesters);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.SemesterCreate = async (req, res) => {
  try {
    const { semester } = req.body;
    let response = {
      success: true,
      code: 200,
    };

    ["semester", "priceTotal", "startDate", "endDate"].map((v) => {
      if (!req.body[v]) throw new Error(`${v} required`);
    });

    let body = _.pick(req.body, [
      "semester",
      "priceTotal",
      "startDate",
      "endDate",
    ]);
    body.startDate = moment(body.startDate).format("YYYY-MM-01");
    body.endDate = moment(body.endDate).format("YYYY-MM-01");
    if (body.startDate > body.endDate) {
      throw new Error("Rentang tanggal tidak sesuai");
    }

    let findSemester = await Semester.findOne({
      where: { semester },
    });
    if (findSemester) throw new Error("Semester sudah terdaftar");

    let semesterData = await Semester.create({
      ...body,
    });
    response.semester = semesterData;

    res.status(response.code).json(response);
  } catch (e) {
    res.status(400).json({ success: false, code: 400, message: e.message });
  }
};
