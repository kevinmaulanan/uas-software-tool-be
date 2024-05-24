"use strict";

module.exports = (sequelize, DataTypes) => {
  var GaleryPhoto = sequelize.define("GaleryPhoto", {
    image: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  return GaleryPhoto;
};
