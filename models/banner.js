"use strict";

module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define("Banner", {
    image: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  return Banner;
};
