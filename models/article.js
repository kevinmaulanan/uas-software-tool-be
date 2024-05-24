"use strict";

module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define("Article", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },

    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  return Article;
};
