"use strict";
const bcrypt = require("bcrypt");

const hashPassword = async user => {
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
  var User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        trim: true,
        unique: true,
        validate: {
          isEmail: true,
          isLowercase: true,
          isUnique: function (value, next) {
            User.findOne({
              where: {
                email: value,
              },
            }).then(user => {
              if (user) {
                return next("Email already used");
              } else {
                next();
              }
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isUnique: function (value, next) {
            User.findOne({
              where: {
                username: value,
              },
            }).then(user => {
              if (user) {
                return next("Username already used");
              } else {
                next();
              }
            });
          },
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      birthDay: {
        type: DataTypes.DATE,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email", "username"],
        },
      ],
    }
  );

  User.beforeCreate(user => {
    return new Promise((resolve, reject) => {
      hashPassword(user)
        .then(hash => {
          user.password = hash;
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = function (models) {};

  return User;
};
