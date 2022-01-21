"use strict";

module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    pointReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedStatus: {
      type: DataTypes.INTEGER,
      defaultValue: false,
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

  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.SubCategory, { foreignKey: "categoryId" });
  };

  return Category;
};
