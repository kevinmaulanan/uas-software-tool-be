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

exports.PaymentList = async (req, res) => {
  try {
    let payments = await Payment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "npm"],
          include: [
            {
              model: Semester,
              attributes: ["id", "semester"],
            },
          ],
        },
        {
          model: DetailPayment,
          order: [["createdAt", "ASC"]],
        },
      ],
      order: [["createdAt", "desc"]],
    });

    res.status(200).send(payments);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.PaymentListByUserId = async (req, res) => {
  try {
    let payments = await Payment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "npm"],
          include: [
            {
              model: Semester,
              attributes: ["id", "semester"],
            },
          ],
        },
        {
          model: Semester,
          attributes: ["id", "semester"],
        },
        {
          model: DetailPayment,
          order: [["createdAt", "ASC"]],
        },
      ],
      where: { userId: req.params.id },
      order: [["createdAt", "desc"]],
    });

    res.status(200).send(payments);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.PaymentDetail = async (req, res) => {
  try {
    let payment = await Payment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "npm"],
          include: [
            {
              model: Semester,
              attributes: ["id", "semester"],
            },
          ],
        },
        {
          model: DetailPayment,
        },
      ],
      order: [
        ["createdAt", "desc"],
        [DetailPayment, "createdAt", "asc"],
      ],
    });

    res.status(200).send(payment);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.PaymentCreate = async (req, res) => {
  try {
    let response = {
      success: true,
      code: 200,
    };
    console
      .log(req.body.userId, "disini body")

 
    console.log(req.body, "disini body2");
    let body = _.pick(req.body, ["dp", "semesterId", "userId"]);
    console.log(body, "test");

    let findMahasiswa = await User.findByPk(body.userId);
    if (!findMahasiswa) throw new Error("Mahasiswa not found!");

    let findSemester = await Semester.findByPk(body.semesterId);
    if (!findSemester) throw new Error("Semester not found!");

    body.priceTotal = findSemester.priceTotal;
    body.startDate = findSemester.startDate;
    body.endDate = findSemester.endDate;

    let paymentData = await Payment.create({ ...body });

    let sisaBayar = body.priceTotal - body.dp;
    if (sisaBayar < 0) sisaBayar = 0;

    let range = moment(findSemester.endDate).diff(
      findSemester.startDate,
      "months"
    );
    paymentData.detailPayements = [];
    let bayarPerBulan = sisaBayar / (range + 1);
    for (let i = 0; i <= range; i++) {
      let detailPayements = await DetailPayment.create({
        paymentId: paymentData.id,
        price: bayarPerBulan,
        date: moment(findSemester.startDate).add(i, "months"),
      });
      paymentData.detailPayements.push(detailPayements);
    }

    response.payment = paymentData;
    res.status(response.code).json(response);
  } catch (e) {
    res.status(400).json({ success: false, code: 400, message: e.message });
  }
};
