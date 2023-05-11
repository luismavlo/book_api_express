'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.belongsTo(models.Author, { foreignKey: 'author_id' });
      Books.hasMany(models.ImgsBooks, { foreignKey: 'book_id' });
    }
  }
  Books.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      number_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      editorial: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      publication_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Books',
    }
  );
  return Books;
};
