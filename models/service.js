"use strict";


module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define("Service", {
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



  return Service;
};
