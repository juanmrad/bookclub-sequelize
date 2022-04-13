'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.user = Review.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      this.book = Review.belongsTo(models.Book, {
        foreignKey: 'book_id'
      })
    }
  }
  Review.init({
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    stars: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};