"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link_icon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deletedStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pointReward: {
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.JSON,
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Categories");
  },
};
