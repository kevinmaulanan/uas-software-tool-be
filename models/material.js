"use strict";

module.exports = (sequelize, DataTypes) => {
  var Material = sequelize.define("Material", {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    materialTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    materialText: {
      type: DataTypes.TEXT,
    },
    materialPDF: {
      type: DataTypes.STRING,
    },
    materialVideo: {
      type: DataTypes.STRING,
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

  Material.associate = function (models) {
    // associations can be defined here
    Material.belongsTo(models.Category, { foreignKey: "categoryId" });
  };

  return Material;
};
