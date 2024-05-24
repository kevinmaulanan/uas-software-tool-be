"use strict";
const bcrypt = require("bcrypt");

const hashPassword = async (user) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.password, salt, null);
    return hash;
  } catch (error) {
    console.error("ERROR_GENERATE_HASH_PASSWORD");
    return error;
  }
};

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  User.beforeCreate((user) => {
    return new Promise((resolve, reject) => {
      hashPassword(user)
        .then((hash) => {
          user.password = hash;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Experience, { foreignKey: "userId" });
  };

  return User;
};
