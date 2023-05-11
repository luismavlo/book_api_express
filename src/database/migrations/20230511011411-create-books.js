'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      number_pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      editorial: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Authors',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  },
};
