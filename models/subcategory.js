"use strict";

module.exports = (sequelize, DataTypes) => {
  var SubCategory = sequelize.define("SubCategory", {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    subCategoryTitle: {
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

  SubCategory.associate = function (models) {
    // associations can be defined here
    SubCategory.hasMany(models.Material, { foreignKey: "subCategoryId" });
    SubCategory.belongsTo(models.Category, { foreignKey: "categoryId" });
  };

  return SubCategory;
};
