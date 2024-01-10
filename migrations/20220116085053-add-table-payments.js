"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      semesterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Semesters",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      dp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Payments");
  },
};
