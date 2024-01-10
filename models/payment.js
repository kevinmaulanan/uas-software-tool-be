"use strict";

module.exports = (sequelize, DataTypes) => {
  var Payment = sequelize.define("Payment", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    semesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Semesters",
        key: "id",
      },
    },
    dp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  Payment.associate = function (models) {
    // associations can be defined here
    Payment.hasMany(models.DetailPayment, { foreignKey: "paymentId" });
    Payment.belongsTo(models.User, { foreignKey: "userId" });
    Payment.belongsTo(models.Semester, { foreignKey: "semesterId" });
  };

  return Payment;
};
