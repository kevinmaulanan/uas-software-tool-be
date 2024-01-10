"use strict";

module.exports = (sequelize, DataTypes) => {
  var DetailPayment = sequelize.define("DetailPayment", {
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Payments",
        key: "id",
      },
    },
    price: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
    paidAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  DetailPayment.associate = function (models) {
    // associations can be defined here
    DetailPayment.belongsTo(models.Payment, { foreignKey: "paymentId" });
  };

  return DetailPayment;
};
