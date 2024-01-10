const jwt = require("jsonwebtoken");
const { User, Payment, Semester, DetailPayment } = require("../../models");
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

exports.DetailPaymentUpdate = async (req, res) => {
  try {
    let findDetailPayment = await DetailPayment.findByPk(req.params.id);
    if (!findDetailPayment) throw new Error("DetailPayment not found!");

    findDetailPayment = await findDetailPayment.update({ paidAt: new Date() });
    res.status(200).json(findDetailPayment);
  } catch (e) {
    res.status(400).json({ success: false, code: 400, message: e.message });
  }
};
