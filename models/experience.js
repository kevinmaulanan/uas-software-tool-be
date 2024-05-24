"use strict";

module.exports = (sequelize, DataTypes) => {
  var Experience = sequelize.define("Experience", {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    experience: {
      type: DataTypes.TEXT,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  Experience.associate = function (models) {
    // associations can be defined here
    Experience.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Experience;
};
