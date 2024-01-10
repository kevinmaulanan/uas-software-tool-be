"use strict";

module.exports = (sequelize, DataTypes) => {
  var Semester = sequelize.define("Semester", {
    semester: {
      type: DataTypes.STRING,
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

  Semester.associate = function (models) {
    // associations can be defined here
    Semester.hasMany(models.User, { foreignKey: "semesterId" });
    Semester.hasMany(models.Payment, { foreignKey: "semesterId" });
  };

  return Semester;
};
