'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.reviews = Book.hasMany(models.Review, {
        foreignKey: 'book_id'
      })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    publish_date: DataTypes.STRING,
    publisher: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};