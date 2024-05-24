"use strict";

module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define("Client", {
    image: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  return Client;
};
