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
    Category.hasMany(models.Material, { foreignKey: "categoryId" });
  };

  return Category;
};
